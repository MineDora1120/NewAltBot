const queue = new Map()

const SoundQueue = {
 sound : "minedora1120",
 eekta : "system_info_not_handle",
 data : ["youtube com.","에엑따","modejs"]
}

queue.set(12345678,SoundQueue);

const data = queue.get(12345678)

console.log(data.eekta)

const sibal = [11,22,33]
console.log(sibal[0])

console.log(data.data[0])

data.data.push("eekta")

data.data.shift();


console.log(Object.values(data).length)