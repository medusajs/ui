import * as React from "react"

import type { ToastActionElement, ToastProps } from "@/components/toast"

const ACTION_TYPES = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

const TOAST_REMOVE_DELAY = 100000

type ActionType = typeof ACTION_TYPES

type ToasterToast = Pick<ToastProps, "open" | "variant"> & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type State = {
  toasts: ToasterToast[]
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTION_TYPES.ADD_TOAST: {
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      }
    }
    case ACTION_TYPES.UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
        ),
      }
    }
    case ACTION_TYPES.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id))
      }

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId || toastId === undefined
            ? { ...toast, open: false }
            : toast
        ),
      }
    }
    case ACTION_TYPES.REMOVE_TOAST: {
      const { toastId } = action

      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== toastId),
      }
    }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = {
  toasts: [],
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(id: string) {
  if (toastTimeouts.has(id)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(id)
    dispatch({ type: ACTION_TYPES.REMOVE_TOAST, toastId: id })
  }, TOAST_REMOVE_DELAY)
}

type Toast = Omit<ToasterToast, "id">

function toast(props: Toast) {
  const id = generateId()

  const update = (props: Partial<Toast>) => {
    console.log("Updating toast: ", id, props)

    dispatch({
      type: ACTION_TYPES.UPDATE_TOAST,
      toast: {
        id,
        ...props,
      },
    })
  }

  const dismiss = () => {
    dispatch({
      type: ACTION_TYPES.DISMISS_TOAST,
      toastId: id,
    })
  }

  console.log("Adding toast: ", id, props)

  dispatch({
    type: ACTION_TYPES.ADD_TOAST,
    toast: {
      id,
      ...props,
    },
  })

  return {
    id,
    update,
    dismiss,
  }
}

const useToast = () => {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  function dismiss(id: string) {
    dispatch({
      type: ACTION_TYPES.DISMISS_TOAST,
      toastId: id,
    })
  }

  return {
    ...state,
    toast,
    dismiss,
  }
}

export { useToast, type Toast }
