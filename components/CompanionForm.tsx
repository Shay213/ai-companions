"use client";

import { Category, Companion } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Separator } from "./ui/separator";
import ImageUpload from "./ImageUpload";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2Icon, Wand2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { companionCreationSchema } from "@/lib/schemas";

type FormSchema = z.infer<typeof companionCreationSchema>;

type Props = {
  initialCompanion: Companion | null | undefined;
  categories: Category[];
};

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

const CompanionForm = ({ categories, initialCompanion }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(companionCreationSchema),
    defaultValues: initialCompanion || {
      name: "",
      description: "",
      instructions: "",
      categoryId: undefined,
      seed: "",
      src: "",
    },
  });

  const addCompanion = (data: FormSchema) =>
    fetch("/api/companion", { method: "POST", body: JSON.stringify(data) });
  const editCompanion = (companionId: string, data: FormSchema) =>
    fetch(`/api/companion/${companionId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormSchema) =>
      initialCompanion
        ? editCompanion(initialCompanion.id, data)
        : addCompanion(data),
    onError: (err: any) => {
      console.log(err);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    },
    onSuccess: () => {
      toast({
        description: "Success",
      });
      router.push("/");
    },
  });

  const onSubmit = (data: FormSchema) => {
    mutate(data);
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disable={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Elon Musk"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="CEO & Founder of Tesla, SpaceX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for AI behavior
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion&apos;s backstory and
                  relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion&apos;s backstory and
                  relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  {initialCompanion
                    ? "Editing your companion"
                    : "Creating your companion"}
                  <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />
                </>
              ) : (
                <>
                  {initialCompanion
                    ? "Edit your companion"
                    : "Create your companion"}
                  <Wand2 className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
