import { atom } from "jotai";

const sidebarData = atom([
  {
    name: "dashboard",
    icon: "fa fa-th-large icon",
    link: "/admin/dashboard",
    isActive: true,
  },
  {
    name: "Users",
    icon: "fa fa-users icon",
    link: "/admin/dashboard/Users",
    isActive: false,
  },
  {
    name: "Deposits",
    icon: "fa fa-piggy-bank icon",
    link: "/admin/dashboard/deposits",
    isActive: false,
  },
  {
    name: "Withdrawals",
    icon: "fa fa-money-check icon",
    link: "/admin/dashboard/withdrawals",
    isActive: false,
  },
  {
    name: "Payment Methods",
    icon: "fa fa-tags icon",
    link: "/admin/dashboard/payment-methods",
    isActive: false,
  },
  {
    name: "Packages",
    icon: "fa fa-gift icon",
    link: "/admin/dashboard/Packages",
    isActive: false,
  },
  {
    name: "Setting",
    icon: "fa fa-tools icon",
    link: "/admin/dashboard/Setting",
    isActive: false,
  },
]);

export default sidebarData;
