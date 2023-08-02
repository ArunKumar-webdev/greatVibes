import React, { useEffect, useState, useMemo, useCallback } from "react";
import { fetchJobs } from "../actions/jobs";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCard from "../components/common/skeletonCard";
import JobCard from "../components/job/jobCard";
import { useSelector, useDispatch } from "react-redux";

const Jobs = ({ handleModalOpen }) => {
  const dispatch = useDispatch();
  const { jobs, hasMore } = useSelector((state) => state.jobs);
  const [lastPageFetched, setLastPageFetched] = useState(0);

  useEffect(() => {
    dispatch(fetchJobs({ page: 1, limit: 10 }));
    setLastPageFetched(1);
  }, [dispatch]);

  const fetchNextPage = useCallback(() => {
    if (!hasMore || jobs.length % 10 !== 0) {
      return;
    }
    const nextPage = lastPageFetched + 1;
    dispatch(fetchJobs({ page: nextPage, limit: 10 }));
    setLastPageFetched(nextPage);
  }, [dispatch, hasMore, jobs.length, lastPageFetched]);

  const memoizedJobs = useMemo(
    () => jobs.map((job) => <JobCard key={job.id} job={job} />),
    [jobs]
  );
  const flexCenter = "flex items-center justify-center";
  return (
    <>
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={
          <>
            <SkeletonCard numOfLines={5} />
          </>
        }
      >
        <main className={`${flexCenter} flex-wrap gap-8 py-8 px-4 md:px-0`}>
          {memoizedJobs}
        </main>
      </InfiniteScroll>
      <div
        data-dial-init
        className="fixed bottom-0 right-0 mb-4 mr-4 visible md:invisible group"
      >
        <button
          type="button"
          onClick={handleModalOpen}
          data-dial-toggle="speed-dial-menu-click"
          data-dial-trigger="click"
          aria-controls="speed-dial-menu-click"
          aria-expanded="false"
          className={`${flexCenter} w-14 h-14 rounded-full text-white bg-button-primary hover:bg-button-primary focus:ring-4 focus:ring-button-primary focus:outline-none dark:bg-button-primary dark:hover:bg-button-primary dark:focus:ring-button-primary`}
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default React.memo(Jobs);
