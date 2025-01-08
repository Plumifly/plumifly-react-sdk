import React, { CSSProperties, useState } from "react";
import { BlogListResponse } from "../../types";
import { Image as ImageIcon, ArrowLeft } from "lucide-react";

interface BlogTheme {
  colors?: {
    primary?: string;
    secondary?: string;
    text?: string;
    background?: string;
    accent?: string;
  };
  fonts?: {
    primary?: string;
    secondary?: string;
  };
  spacing?: {
    small?: string;
    medium?: string;
    large?: string;
  };
}

interface BlogListProps {
  data: BlogListResponse;
  theme?: BlogTheme;
  onBack?: () => void;
}

interface ImageErrorState {
  [key: string]: boolean;
}

export function BlogList({ data, theme, onBack }: BlogListProps) {
  const { project, blogs } = data;
  const [imageErrors, setImageErrors] = useState<ImageErrorState>({});

  const styles: Record<string, CSSProperties> = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: theme?.spacing?.large || "40px 20px",
      backgroundColor: theme?.colors?.background || "white",
    },
    header: {
      marginBottom: theme?.spacing?.large || "40px",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      color: theme?.colors?.secondary || "#666",
      fontSize: "14px",
      cursor: "pointer",
      border: "none",
      background: "none",
      padding: "8px",
      borderRadius: "4px",
      transition: "color 0.2s ease",
      marginBottom: theme?.spacing?.medium || "16px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "500",
      color: theme?.colors?.text || "#111",
      margin: "0",
      letterSpacing: "-0.02em",
      fontFamily: theme?.fonts?.primary,
    },
    subheading: {
      fontSize: "1rem",
      color: theme?.colors?.secondary || "#666",
      margin: "8px 0 0 0",
      fontFamily: theme?.fonts?.secondary,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: theme?.spacing?.large || "32px",
      width: "100%",
    },
    article: {
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: theme?.colors?.background || "white",
      borderRadius: "12px",
      overflow: "hidden",
      border: `1px solid ${theme?.colors?.secondary || "#eee"}`,
      height: "100%",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      paddingBottom: "56.25%",
      backgroundColor: theme?.colors?.secondary || "#f4f4f4",
      overflow: "hidden",
    },
    image: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
    },
    placeholderContainer: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme?.colors?.secondary || "#f4f4f4",
      color: theme?.colors?.primary || "#999",
    },
    content: {
      padding: theme?.spacing?.medium || "24px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "space-between",
    },
    titleContainer: {
      marginBottom: theme?.spacing?.medium || "16px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: theme?.colors?.text || "#111",
      marginBottom: theme?.spacing?.small || "8px",
      lineHeight: "1.3",
      fontFamily: theme?.fonts?.primary,
    },
    description: {
      fontSize: "15px",
      lineHeight: "1.5",
      color: theme?.colors?.secondary || "#666",
      marginBottom: theme?.spacing?.small || "8px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      maxHeight: "3em",
      fontFamily: theme?.fonts?.secondary,
    },
    metadata: {
      fontSize: "14px",
      color: theme?.colors?.secondary || "#777",
      display: "flex",
      alignItems: "center",
      gap: theme?.spacing?.small || "8px",
      marginTop: "auto",
      paddingTop: theme?.spacing?.medium || "16px",
      borderTop: `1px solid ${theme?.colors?.secondary || "#eee"}`,
      fontFamily: theme?.fonts?.secondary,
    },
  };

  const handleClick = (slug: string) => {
    if (typeof window !== 'undefined') {
      const basePath = window.location.pathname.split("/blog")[0];
      window.location.href = `${basePath}/blog/${slug}`;
    }
  };

  const handleImageError = (postId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [postId]: true
    }));
  };

  const handleArticleHover = (
    e: React.MouseEvent<HTMLElement>,
    isEntering: boolean
  ) => {
    const article = e.currentTarget;
    const image = article.querySelector("img");

    if (article) {
      article.style.transform = isEntering ? "translateY(-4px)" : "translateY(0)";
      article.style.boxShadow = isEntering
        ? `0 4px 12px ${theme?.colors?.secondary || "rgba(0,0,0,0.1)"}`
        : "none";
    }

    if (image) {
      image.style.transform = isEntering ? "scale(1.05)" : "scale(1)";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        {onBack && (
          <button 
            style={styles.backButton}
            onClick={onBack}
            onMouseEnter={e => {
              if (e.currentTarget) {
                e.currentTarget.style.color = theme?.colors?.text || "#111";
              }
            }}
            onMouseLeave={e => {
              if (e.currentTarget) {
                e.currentTarget.style.color = theme?.colors?.secondary || "#666";
              }
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}
        <h1 style={styles.heading}>Latest Articles</h1>
        {project?.name && <p style={styles.subheading}>{project.name}</p>}
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
              {post.imageUrl && !imageErrors[post.id] ? (
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  style={styles.image}
                  onError={() => handleImageError(post.id)}
                />
              ) : (
                <div style={styles.placeholderContainer}>
                  <ImageIcon size={32} color={theme?.colors?.primary} />
                </div>
              )}
            </div>
            <div style={styles.content}>
              <div style={styles.titleContainer}>
                <h2 style={styles.title}>{post.title}</h2>
                {post.description && (
                  <p style={styles.description}>{post.description}</p>
                )}
              </div>

              <div style={styles.metadata}>
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogList;