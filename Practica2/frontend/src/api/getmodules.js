import { url_api } from "../config/RoutePath"
import { usersApi } from "./userApi"

const url_cpu   = url_api + 'system/cpu'
const url_ram   = url_api + 'system/ram'


/* CPU */
export async function getCPU(){
    return fetch(url_cpu, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type":"application/json"
		},
	})
}

/* RAM */
export async function getRAM(){
    return fetch(url_ram, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type":"application/json"
		},
	})
}
