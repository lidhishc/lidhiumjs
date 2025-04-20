import { Component, defineComponent, h } from "vue";

export const Loader: Component = defineComponent({
  name: "Loader",
  setup() {
    return () =>
      h(
        "div",
        {
          class: "loader-container",
          style: `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100px;
        `,
        },
        [
          h("div", {
            class: "loader",
            style: `
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          `,
          }),
          h(
            "span",
            {
              class: "loader-text",
              style: `
            margin-top: 10px;
            color: #666;
            font-size: 14px;
          `,
            },
            "Loading..."
          ),
          h(
            "style",
            null,
            `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
          ),
        ]
      );
  },
});

export const ErrorMessage: Component = defineComponent({
  name: "ErrorMessage",
  emits: ["retry"],
  setup(props, { emit }) {
    return () =>
      h(
        "div",
        {
          class: "error-container",
          style: `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            padding: 20px;
            text-align: center;
          `,
        },
        [
          h(
            "div",
            {
              class: "error-icon",
              style: `
              font-size: 32px;
              margin-bottom: 16px;
            `,
            },
            "⚠️"
          ),
          h(
            "div",
            {
              class: "error-message",
              style: `
              color: #e74c3c;
              font-size: 16px;
              margin-bottom: 16px;
            `,
            },
            "Failed to load component"
          ),
          h(
            "button",
            {
              class: "retry-button",
              style: `
                background-color: #3498db;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s ease;
              `,
              onMouseover: (e: MouseEvent) => {
                (e.target as HTMLElement).style.backgroundColor = "#2980b9";
              },
              onMouseout: (e: MouseEvent) => {
                (e.target as HTMLElement).style.backgroundColor = "#3498db";
              },
              onClick: () => emit("retry"),
            },
            "Retry"
          ),
        ]
      );
  },
});
