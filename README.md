# Plumifly SDK 🌐

The **Plumifly SDK** is a powerful, flexible, and lightweight tool designed to fetch and render blog content seamlessly in **Next.js** and **React** applications. It integrates effortlessly with your blog API, enabling you to display blog lists and posts with a clean and consistent user experience.

---

## Features ✨

- **Dual Compatibility**: Supports both **Next.js** (server-side rendering) and **React** (client-side rendering).
- **Server-Side Data Fetching**: Securely fetch blog data on the server in Next.js and pass it to client components.
- **Client-Side Flexibility**: Utilize components like `BlogList` and `BlogPost` for easy rendering in React.
- **Dynamic Routing Support**: Handles dynamic paths for individual blog posts or blog lists seamlessly.
- **Simple Initialization**: Easy-to-use `initPlumifly` function for setting up your API key.

---

## Installation 📦

Install the SDK using your preferred package manager:

```bash
# npm
npm install plumifly-sdk

# yarn
yarn add plumifly-sdk

# bun
bun add plumifly-sdk
```

---

## Usage 🚀

### Next.js Example (Server-Side Fetching)

```typescript
// app/blog/[[...slug]]/page.tsx
import { initPlumifly, fetchBlogPosts, fetchBlogPost } from 'plumifly-sdk';
import BlogPageClient from './BlogPageClient';

// Initialize the SDK
initPlumifly({
  apiKey: 'your-api-key',
});

export default async function Page({ params }: { params: { slug?: string[] } }) {
  let data;

  if (params.slug && params.slug.length > 0) {
    data = await fetchBlogPost(params.slug[0]);
  } else {
    data = await fetchBlogPosts();
  }

  return <BlogPageClient data={data} />;
}
```

### React Example (Client-Side Fetching)

```typescript
import React, { useEffect, useState } from 'react';
import { initPlumifly, fetchBlogPosts, BlogList } from 'plumifly-sdk';

// Initialize the SDK
initPlumifly({
  apiKey: 'your-api-key',
});

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogPosts()
      .then(setBlogs)
      .catch(console.error);
  }, []);

  return <BlogList posts={blogs} />;
}
```

---

## Components 🧩

### `BlogList`
Renders a list of blog posts fetched from the API.

### `BlogPost`
Displays the details of a single blog post.


## Getting Started 📝

1. **Register**: Sign up at [plumifly.com](https://plumifly.com) to obtain your API key.
2. **Install**: Add the Plumifly SDK to your project using your preferred package manager.
3. **Initialize**: Use the `initPlumifly` function with your API key.
4. **Fetch & Render**: Utilize the provided functions and components to fetch and display your blog content.

---

## License 📝

This project is licensed under the [MIT License](LICENSE).

---

## Contribute 🤝

We welcome contributions to enhance the Plumifly SDK! Feel free to:

- **Submit Issues**: Report bugs or suggest features.
- **Fork the Repository**: Make your own changes.
- **Create Pull Requests**: Share your improvements with the community.

Join us in making Plumifly SDK even better! 🎉

---

## Support

For any questions or support, please reach out to our [support team](mailto:albertoslavica@plumifly.com).

---

© 2024 Plumifly. All rights reserved.