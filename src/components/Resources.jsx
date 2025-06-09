import React from "react";

const Resources = ({ resources, loadingResources }) => {
  return (
    <div>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
        <div className="mt-2">
          <h3 className="font-bold text-lg text-slate-700 mb-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              🌐
            </div>
            Additional Resources
          </h3>
          {loadingResources ? (
            <p className="text-slate-400 text-sm">Loading resources...</p>
          ) : (
            <div className="space-y-3">
              {resources.ytVideos.length > 0 && (
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="font-semibold text-black mb-2">
                    YouTube Videos
                  </p>
                  <ul className="space-y-2">
                    {resources.ytVideos.map((v) => (
                      <li
                        key={v.id.videoId}
                        className="flex items-center gap-3"
                      >
                        <a
                          href={`https://youtube.com/watch?v=${v.id.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group"
                        >
                          <img
                            src={v.snippet.thumbnails?.default?.url}
                            alt={v.snippet.title}
                            className="w-20 h-14 rounded shadow border border-slate-200 group-hover:scale-105 transition-transform"
                          />
                          <span className="text-gray-600 hover:underline text-xs font-medium">
                            {v.snippet.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!resources.wiki && resources.ytVideos.length === 0 && (
                <p className="text-slate-400 text-xs">No resources found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
