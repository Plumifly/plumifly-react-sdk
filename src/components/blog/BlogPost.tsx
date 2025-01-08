import React, { CSSProperties, ComponentProps, useState } from "react";
import { BlogPostTypes } from "../../types";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    color: "#666",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "8px",
    borderRadius: "4px",
    transition: "color 0.2s ease",
  },
  imageContainer: {
    width: "100%",
    height: "400px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "40px",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  fallbackImage: {
    position: "absolute",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundColor: "#f4f4f4",
  },
  fallbackTitle: {
    fontSize: "24px",
    fontWeight: "500",
    color: "#111",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    fontWeight: "500",
    color: "#111",
    marginBottom: "24px",
    letterSpacing: "-0.02em",
    lineHeight: "1.1",
  },
  description: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "64px",
    lineHeight: "1.6",
  },
  mainContent: {
    display: "flex",
    gap: "32px",
  },
  article: {
    flex: "1",
    minWidth: 0,
  },
  sidebar: {
    width: "288px",
    flexShrink: 0,
    borderLeft: "1px solid #eee",
    padding: "0 24px",
    position: "sticky",
    top: "96px",
    alignSelf: "flex-start",
    height: "fit-content",
  },
  sidebarSection: {
    marginBottom: "32px",
  },
  sidebarLabel: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
  },
  sidebarValue: {
    fontSize: "14px",
    color: "#111",
  },
  sectionsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sectionItem: {
    marginBottom: "8px",
  },
  sectionButton: {
    width: "100%",
    textAlign: "left",
    padding: "4px 8px",
    border: "none",
    background: "none",
    fontSize: "14px",
    color: "#666",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  },
};

const markdownStyles: Record<string, CSSProperties> = {
  h1: {
    fontSize: "32px",
    fontWeight: "500",
    color: "#111",
    marginTop: "40px",
    marginBottom: "20px",
    lineHeight: "1.2",
    scrollMarginTop: "80px",
  },
  h2: {
    fontSize: "28px",
    fontWeight: "500",
    color: "#111",
    marginTop: "36px",
    marginBottom: "18px",
    lineHeight: "1.3",
    scrollMarginTop: "80px",
  },
  h3: {
    fontSize: "24px",
    fontWeight: "500",
    color: "#111",
    marginTop: "32px",
    marginBottom: "16px",
    lineHeight: "1.4",
    scrollMarginTop: "80px",
  },
  p: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#444",
    marginTop: "16px",
    marginBottom: "16px",
  },
  ul: {
    marginTop: "16px",
    marginBottom: "16px",
    paddingLeft: "24px",
  },
  ol: {
    marginTop: "16px",
    marginBottom: "16px",
    paddingLeft: "24px",
  },
  li: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#444",
    marginTop: "8px",
  },
  blockquote: {
    borderLeft: "2px solid #ddd",
    paddingLeft: "20px",
    marginLeft: 0,
    marginRight: 0,
    fontStyle: "italic",
    color: "#666",
  },
};

const markdownComponents: Components = {
  h1: ({ node, ...props }) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return <h1 id={id} style={markdownStyles.h1} {...props} />;
  },
  h2: ({ node, ...props }) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return <h2 id={id} style={markdownStyles.h2} {...props} />;
  },
  h3: ({ node, ...props }) => {
    const id = props.children
      ?.toString()
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return <h3 id={id} style={markdownStyles.h3} {...props} />;
  },
  p: ({ node, ...props }) => <p style={markdownStyles.p} {...props} />,
  ul: ({ node, ...props }) => <ul style={markdownStyles.ul} {...props} />,
  ol: ({ node, ...props }) => <ol style={markdownStyles.ol} {...props} />,
  li: ({ node, ...props }) => <li style={markdownStyles.li} {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote style={markdownStyles.blockquote} {...props} />
  ),
};

interface BlogPostProps {
  post: BlogPostTypes;
  onBack?: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  const [imageError, setImageError] = useState(false);

  const readingTime = `${Math.max(
    1,
    Math.ceil((post.content?.split(/\s+/).length || 0) / 200)
  )} min read`;

  const sections = post.content
    ? post.content
        .split("\n")
        .filter((line) => /^#{1,3}\s/.test(line))
        .map((line) => {
          const level = (line.match(/^#+/) || [""])[0].length;
          const title = line
            .replace(/^#+\s/, "")
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/`/g, "")
            .trim();

          return {
            title,
            id: title
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, ""),
            depth: level,
          };
        })
    : [];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        {onBack && (
          <button
            style={styles.backButton}
            onClick={onBack}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}
      </header>

      {post.imageUrl && !imageError && (
        <div style={styles.imageContainer}>
          <img
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {imageError && (
        <div style={styles.imageContainer}>
          <div style={styles.fallbackImage}>
            <h2 style={styles.fallbackTitle}>{post.title}</h2>
          </div>
        </div>
      )}

      <h1 style={styles.title}>{post.title}</h1>

      {post.description && <p style={styles.description}>{post.description}</p>}

      <div style={styles.mainContent}>
        <article style={styles.article}>
          {post.content && (
            <ReactMarkdown components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          )}
        </article>

        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <p style={styles.sidebarLabel}>Published</p>
            <p style={styles.sidebarValue}>
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div style={styles.sidebarSection}>
            <p style={styles.sidebarLabel}>Reading Time</p>
            <p style={styles.sidebarValue}>{readingTime}</p>
          </div>

          {sections.length > 0 && (
            <div style={styles.sidebarSection}>
              <p style={styles.sidebarLabel}>Sections</p>
              <ul style={styles.sectionsList}>
                {sections.map((section) => (
                  <li
                    key={section.id}
                    style={{
                      ...styles.sectionItem,
                      paddingLeft: `${(section.depth - 1) * 12}px`,
                    }}
                  >
                    <button
                      style={styles.sectionButton}
                      onClick={() => scrollToSection(section.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f4f4f4";
                        e.currentTarget.style.color = "#111";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#666";
                      }}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default BlogPost;
