var playerInfo = {
      name: window.prompt("What is your robot's name?"),
      health: 36,
      attack: 10,
      money: 10,
}

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 20;
var enemyAttack = 12;

window.alert("Welcome to Robot Gladiators!");

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
}

var fight = function(enemyName) {
    while (playerInfo.health > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerInfo.money for skipping
          playerInfo.money = Math.max(0, playerInfo.money - 10);
          console.log("playerInfo.money", playerInfo.money)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var playerDamage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemyHealth = Math.max(0, enemyHealth - playerDamage);
      
      console.log(
        playerInfo.name + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      var enemyDamage = randomNumber(enemyAttack -3, enemyAttack);

      playerInfo.health = Math.max(0, playerInfo.health - enemyDamage);

      console.log(
        enemyName + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    } // end of while loop
  } // end of fight function
  

var startGame = function() {
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 10;

    for(var i = 0; i < enemyNames.length; i++) {
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        var pickedEnemyName = enemyNames[i];
        enemyHealth = randomNumber(40, 60);
        fight(pickedEnemyName);

        if (playerInfo.health > 0 && i < enemyNames.length - 1) {
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            if (storeConfirm) {
                shop();
            }
        }
    } else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
  }

  endGame();
}

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
        if (playerInfo.money >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");
      
          // increase health and decrease money
          playerInfo.health = playerInfo.health + 20;
          playerInfo.money = playerInfo.money - 7;

        } else {
            window.alert("You don't have enough money!");
        }
          break;
        case "upgrade":
        case "UPGRADE":
        if (playerInfo.money >= 7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");
      
          // increase attack and decrease money
          playerInfo.attack = playerInfo.attack + 6;
          playerInfo.money = playerInfo.money - 7;
        } else {
            window.alert("You don't have enough money!");
        }
          break;
        case "leave":
        case "LEAVE":
          window.alert("Leaving the store.");
      
          // do nothing, so function will end
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
      
          // call shop() again to force player to pick a valid option
          shop();
          break;
      }
}

startGame();