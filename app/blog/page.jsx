"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function BlogPost() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect("/auth/login");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <section className="about">
      <div className="container">
        <h2>This it the blog page</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          mollitia rem ad blanditiis, ipsa laboriosam. In ad mollitia ex
          consequatur illo quibusdam perferendis dolorem ratione placeat aperiam
          tempora alias, id, repellat saepe. Ab, itaque eius. Hic suscipit quo
          iusto, temporibus, nisi accusantium distinctio quia aut nemo fuga
          nesciunt reprehenderit qui.
        </p>
      </div>
    </section>
  );
}
