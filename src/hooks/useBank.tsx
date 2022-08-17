import {
  BlackChip,
  BlueChip,
  Chip,
  GreenChip,
  RedChip,
  YellowChip,
} from "@components/Chips";
import _ from "lodash";
import React, { PropsWithChildren, useState } from "react";

type Props = {};
type Currency = {
  name: string;
  value: number;
  component: (props: React.ComponentProps<typeof Chip>) => React.ReactNode;
};
export type Balance = {
  bills: {
    [key: string]: number;
  };
  total: number;
};
export const EmptyBalance: Balance = {
  bills: {},
  total: 0,
};
export const StartingBalance: Balance = {
  bills: {
    "5": 10,
    "10": 10,
    "50": 3,
    "100": 2,
    "500": 1,
  },
  total: 1000,
};

export const DealerStartingBalance: Balance = {
  bills: {
    "5": 100,
    "10": 100,
    "50": 30,
    "100": 20,
    "500": 10,
  },
  total: 10000,
};
export const StartingAccount = {
  balance: StartingBalance,
  bet: EmptyBalance,
};
export const DealerStartingAccount = {
  ...StartingAccount,
  balance: DealerStartingBalance,
};
type Account = {
  balance: Balance;
  bet: Balance;
};
type Accounts = {
  [userId: string]: Account;
};
export const BankContext = React.createContext<{
  accounts: Accounts;
  clearBankAccount: (userId: string) => void;
  getBalance: (userId: string) => Balance;
  getBet: (userId: string) => Balance;
  currencies: Currency[];
  copyBet: (fromUserId: string, toUserId: string) => void;
  addBet: (userId: string, bill: number) => void;
  hasBill: (userId: string, bill: number) => boolean;
  getBalanceBillCount: (userId: string, bill: number) => number;
  getBetBillCount: (userId: string, bill: number) => number;
}>({
  accounts: {},
  clearBankAccount: (userId: string) => {},
  getBalance: (userId: string) => EmptyBalance,
  getBet: (userId: string) => EmptyBalance,
  currencies: [],
  copyBet: (fromUserId: string, toUserId: string) => {},
  addBet: (userId: string, bill: number) => {},
  hasBill: (userId: string, bill: number) => false,
  getBalanceBillCount: (userId: string, bill: number) => 0,
  getBetBillCount: (userId: string, bill: number) => 0,
});
export const useBank = () => React.useContext(BankContext);
export default function BankProvider({ children }: PropsWithChildren<{}>) {
  const [accounts, setAccounts] = useState<Accounts>({
    dealer: DealerStartingAccount,
    player: StartingAccount,
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
  const clearBankAccount = (
    userId: string,
    startingBalance: Account = StartingAccount
  ) => {
    const temp = { ...accounts };
    temp[userId] = startingBalance;
    setAccounts(temp);
  };

  const getBalance = (userId: string) => {
    return accounts[userId] ? accounts[userId].balance : EmptyBalance;
  };
  const getBet = (userId: string) => {
    return accounts[userId] ? accounts[userId].bet : EmptyBalance;
  };
  const addBet = (userId: string, bill: number) => {
    const temp = { ...accounts };
    if (canBet(userId, bill)) {
      if (!hasBill(userId, bill)) {
        shiftBills(temp, userId, bill);
      } else {
        addBillsToBet(temp, userId, bill);
      }
      setAccounts(temp);
    }
  };
  const addBillsToBet = (temp: Accounts, userId: string, bill: number) => {
    temp[userId].balance.bills[bill] -= 1;
    temp[userId].balance.total -= bill;
    temp[userId].bet.bills[bill] = getBetBillCount(userId, bill) + 1;
    temp[userId].bet.total += bill;
  };
  const shiftBills = (temp: Accounts, userId: string, bill: number) => {
    const currentBills = temp[userId].balance.bills;
    const largerBill = Object.keys(currentBills).find((billName) => {
      const billCount = currentBills[billName];
      const billValue = parseInt(billName);
      const isBillLarger = billValue > bill;
      return isBillLarger && billCount > 0;
    });
    if (largerBill) {
      const billValue = parseInt(largerBill);
      const billCount = currentBills[largerBill];
      const newBills = Math.floor(billValue / bill);
      temp[userId].balance.bills[largerBill] = billCount - 1;
      temp[userId].balance.bills[bill] = newBills;
    } else {
      const smallerBills = Object.keys(currentBills)
        .filter((billName) => {
          const billValue = parseInt(billName);
          const isBillLarger = billValue >= bill;
          return !isBillLarger;
        })
        .sort(function (a, b) {
          return parseInt(b) - parseInt(a);
        });
      var remainder = bill;
      for (let index = 0; index < smallerBills.length; index++) {
        const billName = smallerBills[index];
        const billValue = parseInt(billName);
        const totalBillCount = currentBills[billName];
        if (remainder === 0) {
          break;
        }
        const neededBillCount = Math.floor(remainder / billValue);
        const billCount =
          _.min([neededBillCount, totalBillCount]) || totalBillCount;
        remainder = remainder - billValue * billCount;
        temp[userId].balance.bills[billName] = totalBillCount - billCount;
      }
      temp[userId].balance.bills[bill] += 1;
    }
  };
  const canBet = (userId: string, amount: number) => {
    const balance = getBalance(userId);
    return balance.total >= amount;
  };
  const hasBill = (userId: string, bill: number) => {
    return getBalance(userId).bills[bill.toString()] > 0;
  };

  const copyBet = (fromUserId: string, toUserId: string) => {
    const temp = { ...accounts };
    temp[toUserId] = {
      balance: accounts[toUserId] ? accounts[toUserId].balance : EmptyBalance,
      bet: accounts[fromUserId] ? accounts[fromUserId].bet : EmptyBalance,
    };
    setAccounts(temp);
  };
  const getBalanceBillCount = (userId: string, bill: number) => {
    return getBalance(userId).bills[bill.toString()] || 0;
  };
  const getBetBillCount = (userId: string, bill: number) => {
    return getBet(userId).bills[bill.toString()] || 0;
  };
  return (
    <BankContext.Provider
      value={{
        accounts,
        clearBankAccount,
        getBalance,
        getBet,
        currencies,
        copyBet,
        addBet,
        hasBill,
        getBalanceBillCount,
        getBetBillCount,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}
