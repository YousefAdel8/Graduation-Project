import { Image } from "antd";

export default function PostCard({ post }) {
	return (
		<>
			{post.photoUrl && (
				<div style={{ margin: "8px 0", padding: "3px 0" }}>
					<div
						style={{
							width: "100%",
							height: "400px",
							position: "relative",
							overflow: "hidden",
						}}
					>
						<Image
							src={`https://cms-reporting.runasp.net/${post.photoUrl}`}
							alt="post image"
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						/>
					</div>
				</div>
			)}
		</>
	);
}

/*
import { Image } from 'antd';
import React from 'react';

export default function PostPhotos({ post }) {
  // Guard clause if no media exists
  if (!post.media || !post.media.length) return null;

  // Get the first media item
  const firstMedia = post.media[0];
  // Get total media count
  const mediaCount = post.mediaCount;

  return (
    <div
      style={{
        margin: "8px 0",
        padding: "3px 0",
      }}
    >
      <div style={{ 
        width: "100%", 
        height: "400px", // Fixed height instead of padding-bottom
        position: "relative",
        overflow: "hidden" 
      }}>
        {firstMedia.type === "image" ? (
          <Image
          src={`https://cms-reporting.runasp.net/api/${post.photoUrl}`}
          alt="post media"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x225?text=No+Image";
          }}
        />
        ) : (
          <video
            controls
            src={firstMedia.url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        )}
        
        {/* Counter indicator if there are more than 1 media items */
/*{mediaCount > 1 && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 16,
              fontSize: 14,
              fontWeight: "bold"
            }}
          >
            +{mediaCount - 1}
          </div>
        )}
      </div>
    </div>
  );
}
*/
