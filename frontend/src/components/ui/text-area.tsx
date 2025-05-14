import * as React from "react";

import {cn} from "@/lib/utils";

function Textarea({className, ...props}: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] bg-primary-200 h-36 py-2.5 px-3.5 rounded-lg placeholder-primary-100 placeholder:opacity-50 text-primary-100 resize-none text-area",
                className,
            )}
            {...props}
        />
    );
}

export {Textarea};