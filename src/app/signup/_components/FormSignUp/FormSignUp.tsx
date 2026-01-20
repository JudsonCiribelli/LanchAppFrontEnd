"use client";
import { useActionState, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signUpAction } from "../../actions/auth";
import { SignUpSchema, SignUpSchemaType } from "../../schemas/schema";
import { useRouter } from "next/navigation";

const FormSignUp = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(signUpAction, {
    success: false,
    message: null,
  });

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { name: "", email: "", password: "", phone: "" },
  });

  useEffect(() => {
    if (state.success && state.redirectTo) {
      form.reset();
      router.replace(state.redirectTo);
    }
  }, [state, form, router]);

  const formatPhone = (value: string) => {
    if (!value) return "";

    value = value.replace(/\D/g, "");
    value = value.substring(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return value;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-3xl font-bold">
          Lanch<span className="text-brand-primary">App</span>
        </CardTitle>
        <CardDescription>
          Preencha os dados para validar sua conta.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-5" action={action}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome"
                      type="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input
                      placeholder="********"
                      type="password"
                      {...field}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(11) 99999-9999"
                      type="tel"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={15}
                    />
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
                  Validando...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>

            <div className="text-center">
              <span>
                Já tem uma conta ?{" "}
                <Link href="/login" className="font-bold">
                  Faça login
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormSignUp;
