import {
  BlackChip,
  BlueChip,
  Chip,
  GreenChip,
  RedChip,
  YellowChip,
} from "@components/Chips";
import React, { PropsWithChildren, useState } from "react";

type Props = {};
type Currency = {
  name: string;
  value: number;
  component: (props: React.ComponentProps<typeof Chip>) => React.ReactNode;
};
type Balance = {
  bills: {
    [key: string]: number;
  };
  total: number;
};
type Account = {
  balance: Balance;
  bet: Balance;
};
type Bank = {
  [userId: string]: Account;
};
export const BankContext = React.createContext<{
  bank: Bank;
  addToBank: (userId: string, amount: number) => void;
  clearBankAccount: (userId: string) => void;
  addToBet: (userId: string, betAmount: number) => void;
  getBalance: (userId: string) => Balance;
  getBet: (userId: string) => number;
  returnBet: (userId: string) => void;
  transferBet: (fromUserId: string, toUserId: string) => void;
  currencies: Currency[];
}>({
  bank: {},
  addToBank: (userId: string, amount: number) => {},
  clearBankAccount: (userId: string) => {},
  addToBet: (userId: string, betAmount: number) => {},
  getBalance: (userId: string) => ({
    bills: {},
    total: 0,
  }),
  getBet: (userId: string) => 0,
  returnBet: (userId: string) => {},
  transferBet: (fromUserId: string, toUserId: string) => {},
  currencies: [],
});
export const useBank = () => React.useContext(BankContext);
export default function BankProvider({ children }: PropsWithChildren<{}>) {
  const [bank, setBank] = useState<Bank>({
    dealer: {
      balance: {
        bills: {
          "5": 100,
          "10": 100,
          "50": 30,
          "100": 20,
          "500": 10,
        },
        total: 10000,
      },
      bet: {
        bills: {},
        total: 0,
      },
    },
    player: {
      balance: {
        bills: {
          "5": 10,
          "10": 10,
          "50": 3,
          "100": 2,
          "500": 1,
        },
        total: 1000,
      },
      bet: {
        bills: {},
        total: 0,
      },
    },
  });
  const currencies = [
    {
      name: "5",
      value: 5,
      component: GreenChip,
    },
    {
      name: "10",
      value: 10,
      component: BlueChip,
    },
    {
      name: "50",
      value: 50,
      component: RedChip,
    },
    {
      name: "100",
      value: 100,
      component: YellowChip,
    },
    {
      name: "500",
      value: 500,
      component: BlackChip,
    },
  ];
  const addToBank = (userId: string, amount: number) => {
    const tempBank = { ...bank };
    const bills = currencies.map((each) => each.value);
    bills.sort((a, b) => b - a);
    var remaining = amount;
    bills.forEach((bill, index) => {
      const billCount = Math.floor(amount / bill);
      remaining = remaining % bill;
      tempBank[userId].balance.bills[currencies[index].name] += billCount;
    });
    tempBank[userId].balance.total += amount;
    setBank(tempBank);
  };
  const clearBankAccount = (userId: string, startingBalance: number = 0) => {
    const newBank = { ...bank };
    newBank[userId] = {
      balance: startingBalance,
      bet: 0,
    };
    setBank(newBank);
  };
  const addToBet = (userId: string, betAmount: number) => {
    const newBank = { ...bank };
    if (
      bank[userId] &&
      (bank[userId].balance.total - betAmount < 0 ||
        bank[userId].balance.bills[betAmount] < 1)
    ) {
      return false;
    }
    newBank[userId] = {
      balance: {
        bills: {
          ...bank[userId].balance.bills,
          [betAmount]: bank[userId].balance.bills[betAmount] - 1,
        },
        total: bank[userId].balance.total - betAmount,
      },
      bet: {
        bills: {
          ...bank[userId].bet.bills,
          [betAmount]: bank[userId].bet.bills[betAmount] || 0 + 1,
        },
        total: bank[userId].bet.total + betAmount,
      },
    };
    setBank(newBank);
    return true;
  };
  const getBalance = (userId: string) => {
    return bank[userId] ? bank[userId].balance : 0;
  };
  const getBet = (userId: string) => {
    return bank[userId] ? bank[userId].bet : 0;
  };
  const returnBet = (userId: string) => {
    const newBank = { ...bank };
    newBank[userId] = {
      balance: bank[userId] ? bank[userId].balance + bank[userId].bet : 0,
      bet: 0,
    };
    setBank(newBank);
  };
  const transferBet = (fromUserId: string, toUserId: string) => {
    const newBank = { ...bank };
    newBank[toUserId] = {
      balance: bank[toUserId]
        ? bank[toUserId].balance + bank[fromUserId].bet
        : 0,
      bet: bank[toUserId] ? bank[toUserId].bet : 0,
    };
    newBank[fromUserId] = {
      balance: bank[fromUserId] ? bank[fromUserId].balance : 0,
      bet: 0,
    };
    setBank(newBank);
  };
  return (
    <BankContext.Provider
      value={{
        bank,
        addToBank,
        clearBankAccount,
        addToBet,
        getBalance,
        getBet,
        returnBet,
        transferBet,
        currencies,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}
