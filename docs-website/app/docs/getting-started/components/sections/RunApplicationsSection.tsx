"use client";

import CodeBlock from "../CodeBlock";

export default function RunApplicationsSection() {
  return (
    <section id="run-applications" className="h-full">
      <h5>Run the applications </h5>
      <CodeBlock
        code={`cd remote\n yarn start remote\n\n cd my-app\n\n yarn start`}
      />
      <h6>
        We can see the component created in one micro-frontend is being used in
        the other frontend using the Lidhium.js library. Even when the remote
        application is stopped, you can see the first application will work
        without any issue.
      </h6>
    </section>
  );
}
