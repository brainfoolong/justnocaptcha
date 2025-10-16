<?php

require_once __DIR__ . "/../php/JustNoCaptcha.php";
use BrainFooLong\JustNoCaptcha\JustNoCaptcha;

$now = microtime(true);

function logTime($msg): void
{
    global $now;
    $diff = microtime(true) - $now;
    $now = microtime(true);
    printf("%s (Took %.2fms)\n", $msg, $diff * 1000);
}

$puzzles = 50;
$difficulty = 4;

JustNoCaptcha::$verifiedSolutionsFolder = __DIR__ . '/../tmp';
JustNoCaptcha::$challengeSalt = 'randomtestsalt';

$fixedChallenges = json_decode(file_get_contents(__DIR__ . '/challenges.json'), true);

foreach ($fixedChallenges['challenges'] as $i => $challengeString) {
    $solutionExpected = $fixedChallenges['solutions'][$i];
    $solution = JustNoCaptcha::solveChallenge($challengeString);
    if ($solution !== $solutionExpected['solution']) {
        throw new Exception('Solution for fixed challenge ' . $i . ' not correct');
    }
}
logTime(count($fixedChallenges['challenges']) . ' fixed challenges correctly solved');

$challenge = JustNoCaptcha::createChallenge($puzzles, $difficulty);
logTime('Challenge created');

$solution = JustNoCaptcha::solveChallenge($challenge);

logTime('Challenge solved');

$verification = JustNoCaptcha::verifySolution($challenge, $solution);
if (!$verification) {
    throw new Exception('Cannot verify solution');
}
logTime('Solution verified');

$verification = JustNoCaptcha::verifySolution($challenge, $solution);
if ($verification) {
    throw new Exception('Solution already verified but still, verifySolution() returns true');
}
logTime('Verifying same challenge again is invalid, this is correct');

$challenge = JustNoCaptcha::createChallenge($puzzles, $difficulty);
file_put_contents(__DIR__ . "/../tmp/cross-challenge/php", $challenge);