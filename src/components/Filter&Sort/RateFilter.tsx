import React from "react";
import StarSvg from "../../assets/svg/star-7207.svg";
import {RateFilterProps} from "../../types/Products"

const RateFilter:React.FC<RateFilterProps> = ({
  selectedRatings,
  handleResetRating,
  handleRatingChange,
}) => {
  return (
    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
        <span className="text-sm font-medium"> Rating </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      <div className="border-t border-gray-200 bg-white">
        <header className="flex items-center justify-between p-4">
          <span className="text-sm text-gray-700">
            {" "}
            {
              Object.values(selectedRatings).filter(Boolean).length
            } Selected{" "}
          </span>

          <button
            type="button"
            className="text-sm text-gray-900 underline underline-offset-4"
            onClick={handleResetRating}
          >
            Reset
          </button>
        </header>

        <ul className="space-y-1 border-t border-gray-200 p-4">
          <li>
            <label
              htmlFor="fourStar"
              className="inline-flex items-center gap-2"
            >
              <input
                type="checkbox"
                id="fourStar"
                className="size-5 rounded border-gray-300"
                checked={selectedRatings.fourStar}
                onChange={handleRatingChange}
              />

              <span className="text-sm font-medium text-gray-700 flex items-center ">
                {" "}
                4 <img src={StarSvg} className="h-3" alt="star" /> & above{" "}
              </span>
            </label>
          </li>

          <li>
            <label
              htmlFor="threeStar"
              className="inline-flex items-center gap-2"
            >
              <input
                type="checkbox"
                id="threeStar"
                className="size-5 rounded border-gray-300"
                checked={selectedRatings.threeStar}
                onChange={handleRatingChange}
              />

              <span className="text-sm font-medium text-gray-700 flex items-center">
                {" "}
                3 <img src={StarSvg} className="h-3" alt="star" /> & above{" "}
              </span>
            </label>
          </li>

          <li>
            <label htmlFor="twoStar" className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                id="twoStar"
                className="size-5 rounded border-gray-300"
                checked={selectedRatings.twoStar}
                onChange={handleRatingChange}
              />

              <span className="text-sm font-medium text-gray-700 flex items-center">
                {" "}
                2 <img src={StarSvg} className="h-3" alt="star" />{" "}
                <span className="font-regular"> & above</span>{" "}
              </span>
            </label>
          </li>

          <li>
            <label htmlFor="oneStar" className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                id="oneStar"
                className="size-5 rounded border-gray-300"
                checked={selectedRatings.oneStar}
                onChange={handleRatingChange}
              />

              <span className="text-sm font-medium text-gray-700 flex items-center">
                {" "}
                1 <img src={StarSvg} className="h-3" alt="star" /> & above{" "}
              </span>
            </label>
          </li>
        </ul>
      </div>
    </details>
  );
};

export default RateFilter;
