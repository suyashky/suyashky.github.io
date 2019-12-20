var scores, roundScore, activePlayer, gamePlaying;

init();

function init() {
	scores       = [0,0];
    activePlayer = 0;
    roundScore   = 0;
    gamePlaying  = true;
    document.querySelector('.btn-hold').classList.remove('block');
    document.querySelector('.btn-roll').classList.remove('block');
    document.querySelector('.btn-hold').classList.remove('allow');
    document.querySelector('.btn-roll').classList.remove('allow');
    document.querySelector('.btn-hold').classList.add('allow');
    document.querySelector('.btn-roll').classList.add('allow');
    document.querySelector('.dice').style.visibility = 'hidden';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function switchPlayer(){
    roundScore = 0;
    document.querySelector('#current-'+activePlayer ).textContent = '0';
    activePlayer===0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click',function() {  
    if(gamePlaying)
    {
        var dice = Math.floor(Math.random()*6)+1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.visibility = 'visible';
        diceDOM.src = 'resources/img/dice-' + dice + '.png';

        if(dice>1)
        {
            roundScore+= dice;
            document.querySelector('#current-'+activePlayer ).textContent = roundScore;
        }
        else
        {
            switchPlayer();
        }    
    }
});

document.querySelector('.btn-hold').addEventListener('click',function() {
	if(gamePlaying)
    {
        scores[activePlayer]+=roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        document.querySelector('.dice').style.visibility = 'hidden';        
        if(scores[activePlayer]>=50)
        {
    		gamePlaying = false;
    		document.getElementById('name-'+activePlayer).textContent = 'Winner!';
    		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    		document.querySelector('.btn-hold').classList.remove('allow');
    		document.querySelector('.btn-roll').classList.remove('allow');
    		document.querySelector('.btn-hold').classList.add('block');
    		document.querySelector('.btn-roll').classList.add('block');
        }
        else
        {
    		switchPlayer();
        }           
    }
});

document.querySelector('.btn-new').addEventListener('click',init);