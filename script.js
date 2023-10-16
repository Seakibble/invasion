
function getType(type) {
    switch (type) {
        case 'crisis': return 'C'
        case 'dilemma': return 'D'
        case 'opportunity': return 'O'
        case 'battle': return 'B'
        case 'threat': return 'T'
    }
}
function getChoice(choice) {
    let output = `
        <div class='choice'>
        <div class='choiceText'>${choice.name}</div>`
    if (choice.test) output += `<p class='check'><b>Test:</b> ${choice.test.join(" + ")}</p>`
    if (choice.outcome || choice.outcome === null) {
        output += makeOutcome(choice.outcome, null)
    } else {
        output += ` 
            ${makeOutcome(choice.success, true)}
            ${makeOutcome(choice.failure, false)}`
    }
    output += `</div>`
    return output
}


function makeOutcome(outcome, _type) {
    let text = []
    let effects = ''
    let type = 'Outcome: '
    if (_type === true) type = 'Success: '
    if (_type === false) type = 'Failure: '

    if (outcome !== null) {
        if (outcome.s) {
            let pos = outcome.s > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.s + ' [S]</span>')
            effects += ' data-s=' + outcome.s
        }
        if (outcome.l) {
            let pos = outcome.l > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.l + ' [L]</span>')
            effects += ' data-l=' + outcome.l
        }
        if (outcome.m) {
            let pos = outcome.m > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.m + ' [M]</span>')
            effects += ' data-m=' + outcome.m
        }
        if (outcome.r) {
            let pos = outcome.r > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.r + ' [R]</span>')
            effects += ' data-r=' + outcome.r
        }
        if (outcome.a) {
            let pos = outcome.a > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.a + ' [A]</span>')
            effects += ' data-a=' + outcome.a
        }
        if (outcome.e) {
            let pos = outcome.e > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.e + ' [E]</span>')
            effects += ' data-t=' + outcome.e
        }
        if (outcome.i) {
            let pos = outcome.i > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.i + ' [I]</span>')
            effects += ' data-i=' + outcome.i
        }
        if (outcome.p) {
            let pos = outcome.p > 0
            text.push('<span class="' + (pos ? 'good' : 'bad') + '">' + (pos ? '+' : '') + outcome.p + ' [P]</span>')
            effects += ' data-p=' + outcome.p
        }
        if (outcome.unlock) {
            effects += ' data-unlock=' + JSON.stringify(outcome.unlock)
        }
        if (outcome.text) {
            text.push('<span class="plain">' + outcome.text + '</span>')
        }
        text = text.join('<span class="plain">,</span> ')
    } else {
        text = '<span class="plain"> No effect</span>'
    }

    return `
    <button class='outcome' ${effects}><b class='${type.toLowerCase()}'>${type}</b> ${text}</button>
    `
}



function drawCard(index, deck) {
    let event = deck[index]
    console.log(deck)
    if (!event) {
        alert("out of events")
        return
    }
    deck.splice(index, 1)

    $nextTurn.disabled = true
    return makeEvent(event)
}

let eventID = 0
let activeEvents = 0
function makeEvent(event) {
    console.log(event.name)
    eventID++
    activeEvents++

    let text = `    
    <div id='event-${eventID}' class='card wrapper'>
        <div class='cardBox ${event.type} ${event.chain}'>
            <div class='content'>`

    let art = 'cardBack'
    if (event.art) art = event.art
    else if (event.type) art = event.type

    text += `<div class='cardArt' style="background-image: url('art/${art}.png')"></div>`
    text += `<h2>[${getType(event.type)}] ${event.name}</h2><div class='stuff'>
                <div class='eventText'><p>${event.text}</p></div>`
    if (event.choices) {
        text += `<div class='choices'> ${getChoice(event.choices[0])}`
        if (event.choices.length > 1) {
            for (let i = 1; i < event.choices.length; i++) {
                // text += `<div class='or'>— OR —</div>`
                text += `${getChoice(event.choices[i])}`
            }
        }
    }
    text += `</div></div></div></div></div>`
    return text
}

let text = `
<div class='container'>
    <div class='time'>
        <h1>The Year of Curses</h1>
        <div class='timeBar'>
            <div id='timeBar' class='timeBarInner'></div>
            <div class='timeBarPip'>I</div><div class='timeBarPip'>II</div><div class='timeBarPip'>III</div><div class='timeBarPip'>IV</div>
            <div class='timeBarPip'>V</div><div class='timeBarPip'>VI</div><div class='timeBarPip'>VII</div><div class='timeBarPip'>VIII</div>
            <div class='timeBarPip'>IX</div><div class='timeBarPip'>X</div><div class='timeBarPip'>XI</div><div class='timeBarPip'>XII</div>
            <span class='skull'>💀</span>
        </div>
    </div>

    <div class='sidebar'>
        <div id='stats' class='stats'>
            <div class='stat heading'><span class='seperator'></span>THE KINGDOM <span class='seperator'></span> </div>
            <div class='stat'><div>[S]</div><div>Stability</div><span id='stability'></div>
            <div class='stat'><div>[L]</div><div>Loyalty</div><span id='loyalty'></div>
            <div class='stat'><div>[E]</div><div>Economy</div><span id='economy'></div>
            <div class='stat'><div>[M]</div><div>Military</div><span id='military'></div>
            
            <div class='stat'><div>[I]</div><div>Intel</div><span id='intel'></div>
            <div class='stat'><div>[A]</div><div>Allies</div><span id='allies'></div>
            <div class='stat'><div>[R]</div><div>Relics</div><span id='relics'></div>
            <div class='stat'><div>[P]</div><div>Portents</div><span id='portents'></div>
        </div>

        <button id="nextTurn" class='endTurn'>[H] Advance Calendar</button>
    </div>

    <div id='events' class='events'></div>
</div>
`

function iconSwitch(text) {
    text = text.replaceAll('[S]', '<span class="icon">⚖️</span>') // Stability
    text = text.replaceAll('[L]', '<span class="icon">❤️</span>') // Loyalty
    text = text.replaceAll('[E]', '<span class="icon">💎</span>') // Economy
    text = text.replaceAll('[M]', '<span class="icon">🛡️</span>') // Military

    text = text.replaceAll('[I]', '<span class="icon">🔍</span>') // Intel
    text = text.replaceAll('[A]', '<span class="icon">🤝</span>') // Allies
    text = text.replaceAll('[R]', '<span class="icon">🔮</span>') // Relics
    text = text.replaceAll('[P]', '<span class="icon">👁️</span>') // Portents

    text = text.replaceAll('[C]', '<span class="icon">💥</span>') // Crisis
    text = text.replaceAll('[O]', '<span class="icon">🌠</span>') // Opportunity
    text = text.replaceAll('[D]', '<span class="icon">❓</span>') // Dilemma
    text = text.replaceAll('[B]', '<span class="icon">⚔️</span>') // Battle
    text = text.replaceAll('[T]', '<span class="icon">💀</span>') // Threat

    text = text.replaceAll('[H]', '<span class="icon hourglass">⌛️</span>') // Dilemma

    text = text.replaceAll('//', '</p><p>') // New Paragraph

    return text
}


document.body.innerHTML = iconSwitch(text)

let $events = document.getElementById('events')
let $nextTurn = document.getElementById('nextTurn')

let stability = 7
let loyalty = 9
let economy = 5
let military = 6
let intel = 0
let allies = 0
let relics = 0
let portents = 0

let $stability = document.getElementById('stability')
let $loyalty = document.getElementById('loyalty')
let $intel = document.getElementById('intel')
let $military = document.getElementById('military')

let $economy = document.getElementById('economy')
let $allies = document.getElementById('allies')
let $relics = document.getElementById('relics')
let $portents = document.getElementById('portents')

statChange('stability', 0)
statChange('loyalty', 0)
statChange('economy', 0)
statChange('military', 0)
statChange('intel', 0)
statChange('allies', 0)
statChange('relics', 0)
statChange('portents', 0)


$events.addEventListener('click', (e) => {
    let btn = e.target.closest('.outcome')
    if (btn && btn.classList.contains('outcome')) {
        activeEvents--
        if (activeEvents == 0) $nextTurn.disabled = false

        if (btn.dataset.s) statChange('stability', btn.dataset.s)
        if (btn.dataset.l) statChange('loyalty', btn.dataset.l)
        if (btn.dataset.i) statChange('intel', btn.dataset.i)
        if (btn.dataset.m) statChange('military', btn.dataset.m)
        if (btn.dataset.t) statChange('economy', btn.dataset.t)
        if (btn.dataset.a) statChange('allies', btn.dataset.a)
        if (btn.dataset.r) statChange('relics', btn.dataset.r)
        if (btn.dataset.p) statChange('portents', btn.dataset.p)

        let unlock = btn.dataset.unlock
        if (unlock) {
            unlock = JSON.parse(unlock)
            if (Array.isArray(unlock)) {
                unlock.forEach((lockedEvent) => {
                    console.log(lockedEvent)
                    let event = locked.find((card) => card.id == lockedEvent)
                    console.log(event)
                    if (event) mainDeck.push(event)
                })
            }
        }

        let card = btn.closest('.card')
        if (card && card.classList.contains('show')) {
            card.classList.remove('show')
            card.classList.add('hide')
            // card.classList.add('shrink')
            setTimeout(() => {
                card.classList.add('shrink')
                // card.classList.remove('hide')                
            }, 750)
            setTimeout(() => {
                card.remove()
            }, 1500)
        }
    }
})

$events.addEventListener('click', (e) => {
    let card = e.target.closest('.cardBox')
    if (card && card.classList.contains('cardBox')) {
        card.classList.add('flip')
        setTimeout(() => {
            let art = card.getElementsByClassName('cardArt')[0]
            if (art) art.style.display = 'none'
        }, 500);
    }
})

function statState(stat) {
    if (stat > 9) return 'high'
    else if (stat > 5) return 'medium'
    else if (stat > 2) return 'low'
    else if (stat >= 0) return 'critical'
    else return 'failed'
}

function getPos(x) {
    if (x >= 0) return '+' + x
    else return x
}

function statChange(stat, amount) {
    amount = parseInt(amount)
    switch (stat) {
        case 'stability':
            stability += amount
            $stability.innerHTML = `<span class="number ${statState(stability)}">` + getPos(stability) + '</span>'
            break
        case 'loyalty':
            loyalty += amount
            $loyalty.innerHTML = `<span class="number ${statState(loyalty)}">` + getPos(loyalty) + '</span>'
            break
        case 'economy':
            economy += amount
            $economy.innerHTML = `<span class="number ${statState(economy)}">` + getPos(economy) + '</span>'
            break
        case 'military':
            military += amount
            $military.innerHTML = `<span class="number ${statState(military)}">` + getPos(military) + '</span>'
            break
        case 'intel':
            intel += amount
            $intel.innerHTML = '<span class="number">' + intel + '</span>'
            break
        case 'allies':
            allies += amount
            $allies.innerHTML = '<span class="number">' + allies + '</span>'
            break
        case 'relics':
            relics += amount
            $relics.innerHTML = '<span class="number">' + relics + '</span>'
            break
        case 'portents':
            portents += amount
            $portents.innerHTML = '<span class="number">' + portents + '</span>'
            break
    }
}

$timeBar = document.getElementById('timeBar')
function nextMonth() {
    month++
    $timeBar.style.width = (month / 12 * 100) + '%'
    let timeout = 2000
    if (month == 0) timeout = 0
    setTimeout(() => {
        if (month == 12) { // Final Battle
            dealCards(1, endgameDeck)
        } else {
            dealCards(3, mainDeck)
        }
    }, timeout)
}

let month = 0
$nextTurn.addEventListener('click', () => {
    nextMonth()
})


function dealCards(number, deck) {
    let newEvents = []

    for (let i = 0; i < number; i++) {
        let proxyDeck = getProxyDeck(deck)

        let proxyIndex = Math.floor(Math.random() * proxyDeck.length)
        let index = proxyDeck[proxyIndex]
        $events.innerHTML += iconSwitch(drawCard(index, deck))
        newEvents.push(eventID)
    }
    for (let i = 0; i < newEvents.length; i++) {
        setTimeout(() => {
            document.getElementById('event-' + newEvents[i]).classList.add('show')
        }, 500 * i)
    }
}

function getProxyDeck(deck) {
    let proxyDeck = []
    for (let i = 0; i < deck.length; i++) {
        let event = deck[i]
        let weight = 1
        if (event.weight) weight = event.weight

        for (let j = 0; j < weight; j++) proxyDeck.push(i)
    }
    return proxyDeck
}