// PostCard.js
import React from 'react';
import { Card, Avatar, Button, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import PostPhotos from './PostPhotos';
const { Text ,Paragraph} = Typography;
const PostCard = ({ post, En }) => {
    const formatHashtags = (text) => {
		if (!text) return text;
		const parts = text.split(/(#[^\s]+)/g);
		return parts.map((part, i) =>
			part.startsWith("#") ? (
				<Text key={i} style={{ color: "#1976d2", fontWeight: 500 }}>
					{part}
				</Text>
			) : (
				part
			)
		);
	};
  return (
    <Card
      style={{
        overflow: "hidden",
        borderRadius: "14px",
        background: "#fff",
        border: "1.5px solid rgb(215, 212, 212)",
      }}
      bodyStyle={{ padding: 0 }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        dir={En ? "ltr" : "rtl"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={post.icon} size={46} style={{ border: "1px solid #eaeaea" }} />
          <div>
            <Text
              style={{
                fontSize: "15px",
                fontWeight: "600",
                display: "block",
                lineHeight: 1.2,
              }}
            >
              {post.name}
            </Text>
            <Text type="secondary" style={{ fontSize: "13px" }}>
              {post.time}
            </Text>
          </div>
        </div>
        {/*url to post*/}
        <a href={post.postLink} target="_blank" rel="noopener noreferrer">
          <Button type="link" style={{ fontSize: "13px", fontWeight: "600" }}>
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </Button>
        </a>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 10px" }}>
        <Paragraph
          style={{
            margin: 0,
            fontWeight: "400",
            fontSize: "15px",
            marginBottom: post.media && post.media.length ? 12 : 0,
            direction: En ? "ltr" : "rtl",
            textAlign: En ? "left" : "right",
          }}
        >
          {formatHashtags(post.discription)}
        </Paragraph>
      </div>

      {/* Media */}
      <PostPhotos post={post} />

      {/* Reactions Summary */}
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ececec",
        }}
        dir={En ? "ltr" : "rtl"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              background: "#1976d2",
              color: "white",
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              {post.likesCount}
            </Text>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              {En ? " likes" : " اعجاب"}
            </Text>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              {post.commentCount}
            </Text>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              {En ? " comments" : " تعليق"}
            </Text>
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              {post.shareCount}
            </Text>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              {En ? " shares" : " مشاركة"}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;