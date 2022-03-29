import { dialog, BrowserWindow, OpenDialogOptions } from 'electron'

// show open file dialog
export const showOpenDialog = async (
  evt: Event,
  options: object = {}
): Promise<string> => {
  const { canceled, filePaths } = await dialog.showOpenDialog(options)
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}
