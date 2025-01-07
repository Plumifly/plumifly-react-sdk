import React, { CSSProperties } from "react";
import { BlogPost, BlogListResponse } from "../../types";
import { Image as ImageIcon } from "lucide-react";

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  header: {
    marginBottom: "40px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "500",
    color: "#111",
    margin: "0",
    letterSpacing: "-0.02em",
  },
  subheading: {
    fontSize: "1rem",
    color: "#666",
    margin: "8px 0 0 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "32px",
    width: "100%",
  },
  article: {
    display: "flex",
    flexDirection: "column" as const,
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #eee",
    height: "100%",
  },
  imageContainer: {
    position: "relative" as const,
    width: "100%",
    paddingBottom: "56.25%",
    backgroundColor: "#f4f4f4",
    overflow: "hidden",
  },
  image: {
    position: "absolute" as const,
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "transform 0.3s ease",
  },
  placeholderContainer: {
    position: "absolute" as const,
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    color: "#999",
  },
  content: {
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    justifyContent: "space-between",
  },
  titleContainer: {
    marginBottom: "16px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111",
    marginBottom: "8px",
    lineHeight: "1.3",
  },
  description: {
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#666",
    marginBottom: "8px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    maxHeight: "3em",
  },
  metadata: {
    fontSize: "14px",
    color: "#777",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "auto",
    paddingTop: "16px",
    borderTop: "1px solid #eee",
  },
};

interface BlogListProps {
  data: BlogListResponse;
}

export function BlogList({ data }: BlogListProps) {
  const { project, blogs } = data;

  const handleClick = (slug: string) => {
    const basePath = window.location.pathname.split("/blog")[0];
    window.location.href = `${basePath}/blog/${slug}`;
  };

  const handleArticleHover = (
    e: React.MouseEvent<HTMLElement>,
    isEntering: boolean
  ) => {
    const article = e.currentTarget;
    const image = article.querySelector("img");

    article.style.transform = isEntering ? "translateY(-4px)" : "translateY(0)";
    article.style.boxShadow = isEntering
      ? "0 4px 12px rgba(0,0,0,0.1)"
      : "none";

    if (image) {
      image.style.transform = isEntering ? "scale(1.05)" : "scale(1)";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Latest Articles</h1>
        {project.name && <p style={styles.subheading}>{project.name}</p>}
      </header>

      <div style={styles.grid}>
        {blogs.map((post) => (
          <article
            key={post.id}
            style={styles.article}
            onClick={() => handleClick(post.slug)}
            onMouseEnter={(e) => handleArticleHover(e, true)}
            onMouseLeave={(e) => handleArticleHover(e, false)}
          >
            <div style={styles.imageContainer}>
              {post.image_url ? (
                <img
                  src={post.image_url}
                  alt={post.image_alt || post.title}
                  style={styles.image}
                />
              ) : (
                <div style={styles.placeholderContainer}>
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <div style={styles.content}>
              <div style={styles.titleContainer}>
                <h2 style={styles.title}>{post.title}</h2>
                <p style={styles.description}>{post.description}</p>
              </div>

              <div style={styles.metadata}>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
