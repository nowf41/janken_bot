const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('janken')
        .setDescription('let\'s play janken!')
        .addStringOption(opt => opt
            .setName('hand')
            .setDescription('janken hand')
            .addChoices(
                { name: 'Rock', value: 'rock' },
                { name: 'Scissors', value: 'scissors' },
                { name: 'Paper', value: 'paper' },
            )),
    async execute(interaction) {
        // choose hand
        let comHand = '';
        switch (Math.floor(Math.random() * 3)) {
        case 0 : { comHand = 'rock';break; }
        case 1 : { comHand = 'scissors';break; }
        default : { comHand = 'paper';break; }
        }

        // fetch player hand
        const playerHand = interaction.options.getString('hand');
        let message = '';
        if (playerHand === comHand) {
            message = 'Even.';
        } else if (playerHand === 'rock') {
            message = comHand === 'scissors' ? 'You won!' : 'I won!';
        } else if (playerHand === 'scissors') {
            message = comHand === 'paper' ? 'You won!' : 'I won!';
        } else {
            message = comHand === 'rock' ? 'You won!' : 'I won!';
        }

        interaction.reply(`You: ${playerHand} [VS] Me: ${comHand}` + '\n' + message);
    },
};