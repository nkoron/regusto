"use server";

import { encodedRedirect } from "/utils/utils";
import { createClient } from "/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {NextResponse as res} from "next/server";
import * as req from "next/headers";
import * as next from "next/headers";

export const signUpAction = async (formData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return encodedRedirect("error", "register", error.message);
    } else {
        return encodedRedirect(
            "success",
            "register",
            "Thanks for signing up! Please check your email for a verification link.",
        );
    }
};

export const signInAction = async (formData) => {
    const email = formData.get("email") ;
    const password = formData.get("password") ;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return encodedRedirect("error", "login" , error.message);
    }

    return redirect("/admin/dashboard");
};

export const forgotPasswordAction = async (formData) => {
    const email = formData.get("email")?.toString();
    const supabase = createClient();
    const origin = headers().get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        return encodedRedirect("error", "/forgot-password", "Email is required");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) {
        console.error(error.message);
        return encodedRedirect(
            "error",
            "/forgot-password",
            "Could not reset password",
        );
    }

    if (callbackUrl) {
        return redirect(callbackUrl);
    }

    return encodedRedirect(
        "success",
        "/forgot-password",
        "Check your email for a link to reset your password.",
    );
};

export const resetPasswordAction = async (formData) => {
    const supabase = createClient();

    const password = formData.get("password") ;
    const confirmPassword = formData.get("confirmPassword");

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password and confirm password are required",
        );
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Passwords do not match",
        );
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password update failed",
        );
    }

    encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
};