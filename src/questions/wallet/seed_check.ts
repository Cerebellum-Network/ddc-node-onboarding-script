import inquirer, { Question } from 'inquirer'

export async function checkSeed(seed: string): Promise<void> {
	await inquirer.prompt(getRandomWords(seed.split(' ')))
}

function getRandomWords(seedArray: string[]): Question[] {
	const result = []
	const usedIndexes = new Map()
	let counter = 0
	while (counter < 3) {
		const randomIndex = Math.floor(Math.random() * seedArray.length)
		if (usedIndexes.has(randomIndex)) {
			continue
		}
		usedIndexes.set(randomIndex, true)
		counter++
		result.push({
			name: 'checkSeed_' + randomIndex.toString(),
			type: 'input',
			message: `Enter word with number: ${randomIndex + 1}`,
			validate(input: string): boolean {
				return input == seedArray[randomIndex]
			},
		} as Question)
	}
	return result
}
