import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighligther } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import Image from "next/image";

import PostHeader from "./post-header";

import classes from "./post-content.module.css";

const PostContent = (props) => {
  const imagePath = `/images/posts/${props.post.slug}/${props.post.image}`;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${props.post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1];

      return (
        <SyntaxHighligther
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={props.post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>
        {props.post.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
