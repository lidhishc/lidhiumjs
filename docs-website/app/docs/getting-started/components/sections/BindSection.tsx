"use client";

import CodeBlock from "../CodeBlock";

export default function BindSection() {
  return (
    <section id="bind-the-host-app" className="h-full">
      <h5 className="text-2xl font-bold">Bind the applications</h5>
      <p className="mt-2">
        Bind will help to make a connection between binding target app to the
        source app, so that the exposed components can be used in the other
        applications.
      </p>
      <CodeBlock code={`cd my-app\nlidhium bind`} />
    </section>
  );
}
