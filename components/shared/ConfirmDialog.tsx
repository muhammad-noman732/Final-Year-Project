"use client";

import * as React from "react";
import { Copy, AlertTriangle, Trash2, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    actionLabel?: string;
    cancelLabel?: string;
    onAction: () => void | Promise<void>;
    isDestructive?: boolean;
    isPending?: boolean;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    actionLabel = "Confirm",
    cancelLabel = "Cancel",
    onAction,
    isDestructive = false,
    isPending = false
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
            <DialogContent className="max-w-md bg-navy-900 border border-gold-500/10 shadow-2xl">
                <DialogHeader className="space-y-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDestructive ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {isDestructive ? <Trash2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                    </div>
                    <DialogTitle className="text-xl font-bold text-foreground">{title}</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6 flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)} 
                        disabled={isPending}
                        className="flex-1 border-gold-500/20 text-muted-foreground hover:bg-navy-800"
                    >
                        {cancelLabel}
                    </Button>
                    <Button 
                        onClick={onAction} 
                        disabled={isPending}
                        className={`flex-1 font-semibold ${isDestructive ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)] border border-rose-400' : 'bg-gold-500 hover:bg-gold-600 text-navy-950 shadow-[0_0_15px_rgba(234,179,8,0.3)] border border-gold-400'}`}
                    >
                        {isPending ? "Processing..." : actionLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
