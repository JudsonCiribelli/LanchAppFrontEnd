"use client";

import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { loginAction } from "../../actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(loginAction, {
    success: false,
    message: "",
    redirectTo: "",
  });

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (state.success && state.redirectTo) {
      toast.success("Login realizado com sucesso!");
      form.reset();
      router.replace(state.redirectTo);
    }
  }, [state, form, router]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-3xl font-bold">
          Lanch<span className="text-brand-primary">App</span>
        </CardTitle>
        <CardDescription>Preencha os dados para fazer login.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form action={action} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seuEmail@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer bg-brand-primary font-bold hover:bg-brand-primary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            {state.message && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                {state.message}
              </div>
            )}

            <div className="text-center">
              <span>
                Não possui conta ?{" "}
                <Link href="/signup" className="font-bold">
                  Cadastre-se
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
