import Comment from "./Comment";

function Post({ title, content, comments }) {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>

      <section>
        {comments.map((comment) => (
          <Comment key={comment.id} info={comment} />
        ))}
      </section>
    </article>
  );
}

export default Post;