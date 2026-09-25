import React from "react";

export default function({ data }) {
    let d = new Date(data),
        months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        date = d.getUTCDate(),
        month = d.getUTCMonth(),
        year = d.getUTCFullYear();
    return (
        <span>
            {date} {months[month]} {year}
        </span>
    );
}
