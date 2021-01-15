import IconInterface from "@/types/schedule/IconInterface"

export default class IconStorage {
  public getIcon(id: string): IconInterface | undefined {
    const icons = this.getIconsList()
    return icons.find(icon => icon.id === id)
  }

  public addIcon(icon: IconInterface): void {
    const icons = this.getIconsList()
    icons.push(icon)
    localStorage.setItem("icons", JSON.stringify(icons))
  }

  private getIconsList(): Array<IconInterface> {
    if (!localStorage.getItem("icons")) {
      localStorage.setItem("icons", JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem("icons") as string)
  }
}