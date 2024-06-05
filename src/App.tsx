import { Dispatch, SetStateAction, useState } from 'react';
import './App.css';
import Form from './Form';
import List from './List';

// ЗАДАЧА:
// Создать мини-приложение, где есть форма, в которой
// текстовый инпут и селект.
// Из селекта можно выбрать тип: "user" или "repo".
//
// В зависимости от того, что выбрано в селекте,
// при отправке формы приложение делает запрос
// на один из следующих эндпоинтов:
//
// https://api.github.com/users/${nickname}
// пример значений: defunkt, ktsn, jjenzz, ChALkeR, Haroenv
//
// https://api.github.com/repos/${repo}
// пример значений: nodejs/node, radix-ui/primitives, sveltejs/svelte
//
// после чего, в списке ниже выводится полученная информация;
// - если это юзер, то его full name и число репозиториев;
// - если это репозиторий, то его название и число звезд.

// ТРЕБОВАНИЯ К ВЫПОЛНЕНИЮ:
// - Типизация всех элементов.
// - Выполнение всего задания в одном файле App.tsx, НО с дроблением на компоненты.
// - Стилизовать или использовать UI-киты не нужно. В задаче важно правильно выстроить логику и смоделировать данные.
// - Задание требуется выполнить максимально правильным образом, как если бы вам нужно было, чтобы оно прошло код ревью и попало в продакшн.

// Все вопросы по заданию и результаты его выполнения присылать сюда - https://t.me/temamint

export interface msessageType {
  sendType: "user" | "repo"
  firstParam: string | null,
  secondeParam: number | null,
}

export const defaultMessage: msessageType = {sendType: "user", firstParam: null, secondeParam: null}

function App() {

  const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [message, setMessage]: [msessageType, Dispatch<SetStateAction<msessageType>>]  = useState(defaultMessage)

  return (
    <>
      <Form error={error} setError={setError} setMessage={setMessage}/>
      {!error && message.firstParam ? <List message={message}/> : <></>}
    </>
  );
}

export default App;
