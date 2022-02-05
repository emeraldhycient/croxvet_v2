import { atom } from "jotai";

const sidebarData = atom([{
        name: "Dashboard",
        icon: "fa fa-th-large",
        link: "/user/dashboard",
        isActive: true,
    },
    {
        name: "Deposit",
        icon: "fa fa-piggy-bank",
        link: "/user/dashboard/deposit/btc",
        isActive: false,
    },
    {
        name: "Withdrawal",
        icon: "fa fa-money-check",
        link: "/user/dashboard/withdrawal/btc",
        isActive: false,
    },
    {
        name: "History",
        icon: "fa fa-history",
        link: "/user/dashboard",
        isActive: false,
    },
    {
        name: "Setting",
        icon: "fa fa-tools",
        link: "/user/dashboard/Setting",
        isActive: false,
    },
]);

export default sidebarData;