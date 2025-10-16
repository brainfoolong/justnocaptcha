<?php

require_once __DIR__ . "/../php/JustNoCaptcha.php";
use BrainFooLong\JustNoCaptcha\JustNoCaptcha;

$types = json_decode(file_get_contents(__DIR__ . "/types.json"), true);
function logTime($msg, &$now): void
{
    $diff = microtime(true) - $now;
    $now = microtime(true);
    printf("%s (Took %.2fms)\n", $msg, $diff * 1000);
}

$difficulty = 4;

JustNoCaptcha::$verifiedSolutionsFolder = __DIR__ . '/../tmp';
JustNoCaptcha::$challengeSalt = 'randomtestsalt';
$now = microtime(true);

foreach ($types as $type) {
    $challengeFile = __DIR__ . "/../tmp/cross-challenge/$type";
    $challenge = file_get_contents($challengeFile);
    $hashFile = __DIR__ . "/../tmp/" . JustNoCaptcha::hash($challenge) . ".pow";
    if (file_exists($hashFile)) {
        unlink($hashFile);
    }
    $solution = JustNoCaptcha::solveChallenge($challenge, $difficulty);
    logTime('Challenge from ' . $type . ' solved', $now);

    $verification = JustNoCaptcha::verifySolution($challenge, $solution);
    if (file_exists($hashFile)) {
        unlink($hashFile);
    }
    if (!$verification) {
        throw new Exception('Cannot verify solution for ' . $type);
    }
    logTime('Solution for ' . $type . ' verified', $now);
}
