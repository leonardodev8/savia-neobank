/**
  Loads the summary through the use case and exposes a flat, screen-shaped object
**/
import { useState } from "react";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { AppError } from "@/core/errors/AppError";
import { Routes } from "@/core/navigation/routes";
import { tokens } from "@/core/theme/tokens";
import { formatMoney, formatSignedMoney } from "@/core/money/format";
import { formatDayTime } from "@/shared/utils/format";
import { useAuthStore } from "@/store/authStore";
import { homeRepository } from "@/features/home/data/repositories/home.repository";
import { makeGetHomeSummaryUseCase } from "@/features/home/domain/usecases/getHomeSummary.usecase";
import type { MovementCategory } from "@/features/home/domain/entities/Movement";

export type AvatarToneName = keyof typeof tokens.avatarTone;

// Initials tone + subtitle suffix per movement category
const CATEGORY_META: Record<
  MovementCategory,
  { tone: AvatarToneName; label: string | null }
> = {
  salary: { tone: "green", label: null },
  transfer: { tone: "teal", label: "Transferencia" },
  purchase: { tone: "amber", label: "Compras" },
};

const MASKED_BALANCE = "S/ ******";

const greetingFor = (hour: number): string => {
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
};

export type MovementRowVM = {
  id: string;
  initials: string;
  tone: AvatarToneName;
  title: string;
  subtitle: string;
  amountText: string;
  isIncome: boolean;
};

export type HomeViewModel = {
  greeting: string;
  user: { initials: string; fullName: string };
  isLoading: boolean;
  error: AppError | null;
  // Null until the summary loads
  balance: {
    visible: boolean;
    valueText: string;
    accountLine: string;
  } | null;
  movements: MovementRowVM[];
  onToggleBalanceVisibility: () => void;
  onTransferPress: () => void;
  onSeeAllPress: () => void;
  onRetry: () => void;
};

const getHomeSummary = makeGetHomeSummaryUseCase(homeRepository);

export const useHomeViewModel = (): HomeViewModel => {
  const router = useRouter();
  const user = useAuthStore((s) => s.session?.user);
  const [balanceVisible, setBalanceVisible] = useState(true);

  const summary = useQuery({
    queryKey: ["home", "summary"],
    queryFn: () => getHomeSummary(),
  });

  const account = summary.data?.account;

  return {
    greeting: greetingFor(new Date().getHours()),
    user: {
      initials: user?.initials ?? "",
      fullName: user?.fullName ?? "",
    },
    isLoading: summary.isPending,
    error: summary.error ? AppError.from(summary.error) : null,
    balance: account
      ? {
          visible: balanceVisible,
          valueText: balanceVisible
            ? formatMoney(account.balanceInCents)
            : MASKED_BALANCE,
          accountLine: `${account.alias} ${account.maskedNumber}`,
        }
      : null,
    movements: (summary.data?.recentMovements ?? []).map((movement) => {
      const meta = CATEGORY_META[movement.category];
      const when = formatDayTime(movement.occurredAt);
      return {
        id: movement.id,
        initials: movement.initials,
        tone: meta.tone,
        title: movement.title,
        subtitle: meta.label ? `${when} | ${meta.label}` : when,
        amountText: formatSignedMoney(movement.amountInCents),
        isIncome: movement.amountInCents >= 0,
      };
    }),
    onToggleBalanceVisibility: () => setBalanceVisible((v) => !v),
    onTransferPress: () => router.push(Routes.transfer),
    onSeeAllPress: () => router.push(Routes.movements),
    onRetry: () => void summary.refetch(),
  };
};
