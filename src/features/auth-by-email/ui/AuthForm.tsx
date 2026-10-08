import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@shared/hooks/store.hooks";
import { Button } from "@shared/ui/Button";
import { FormCard } from "@shared/ui/FormCard";
import { Input } from "@shared/ui/Input";
import { actions } from "../model/authByEmailSlice";

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const { isFetch, state, error } = useAppSelector((state) => state.authByEmail);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    dispatch(actions.authRequest({ email }));
  };

  if (state === "sended") {
    return (
      <FormCard
        title="Проверьте почту"
        text={
          <>
            Ссылка для входа отправлена на <strong>{email}</strong>
          </>
        }
        textRole="status"
        badge={
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
            <path
              d="M4 7.5 12 13l8-5.5M5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11A1.5 1.5 0 0 1 5.5 5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        <Button variant="link" onClick={() => dispatch(actions.authReset())}>
          Изменить почту
        </Button>
      </FormCard>
    );
  }

  return (
    <FormCard
      title="Вход"
      text="Укажите почту — пришлём ссылку для входа."
      onSubmit={handleSubmit}
    >
      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        required
        autoFocus
        value={email}
        disabled={isFetch}
        error={error ?? undefined}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button type="submit" size="lg" fullWidth loading={isFetch}>
        {isFetch ? "Отправляем…" : "Получить ссылку"}
      </Button>
    </FormCard>
  );
};
