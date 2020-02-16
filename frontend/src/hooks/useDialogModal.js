import { useState } from 'react'

function useDialogModal() {
  const [isModalOpened, setIsModalOpened] = useState(false)

  function openDialogModal() {
    setIsModalOpened(true)
  }
  function closeDialogModal() {
    setIsModalOpened(false)
  }

  return {
    isModalOpened,
    openDialogModal,
    closeDialogModal,
  }
}

export default useDialogModal