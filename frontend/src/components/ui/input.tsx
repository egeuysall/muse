import * as React from "react";

import {cn} from "@/lib/utils";

function Input({className, type, ...props}: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] ring-primary-300 bg-primary-200",
                "form-input",
                "outline-none text-primary-100 placeholder-primary-100 placeholder:opacity-50",
                className,
            )}
            {...props}
        />
    );
}

export {Input};