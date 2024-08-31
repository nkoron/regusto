import React from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function CardLineChart() {
  React.useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [40, 68, 86, 74, 56, 60, 87],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "white", // Update to color instead of fontColor
            },
            align: "end",
            position: "bottom",
          },
          title: {
            display: false,
            text: "Sales Charts",
            color: "white", // Update to color instead of fontColor
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(255,255,255,.7)", // Update to color instead of fontColor
            },
            display: true,
            grid: {
              display: false,
              color: "rgba(33, 37, 41, 0.3)",
              borderDash: [2],
              borderDashOffset: [2],
            },
          },
          y: {
            ticks: {
              color: "rgba(255,255,255,.7)", // Update to color instead of fontColor
            },
            display: true,
            grid: {
              color: "rgba(255, 255, 255, 0.15)",
              borderDash: [3],
              borderDashOffset: [3],
            },
          },
        },
      },
    };

    const ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);

    return () => {
      window.myLine.destroy(); // Clean up chart instance on component unmount
    };
  }, []);

  return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Overview
                </h6>
                <h2 className="text-white text-xl font-semibold">Sales value</h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative h-350-px">
              <canvas id="line-chart"></canvas>
            </div>
          </div>
        </div>
      </>
  );
}
