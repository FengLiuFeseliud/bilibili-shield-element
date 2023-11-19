import { useStorage } from "@plasmohq/storage/hook"
import style from "~css/popup.module.css"


function IndexPopup() {
	const [lookThemes] = useStorage("themes")

	document.querySelector(":root").setAttribute("data-themes", lookThemes)
  	return (
		<div className={style.body}>
			
		</div>
	)
}

export default IndexPopup
