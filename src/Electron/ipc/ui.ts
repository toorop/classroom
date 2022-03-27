import { dialog, BrowserWindow, OpenDialogOptions } from 'electron'

// show open file dialog
export const showOpenDialog = async (
  evt: Event,
  props: string[] = []
): Promise<string> => {
  console.log('showOpenDialog')
  console.log(evt)
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: props as OpenDialogOptions['properties']
  })
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}
