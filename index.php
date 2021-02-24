<?php

$filename = 'grid.json';

/**
 * Update grid data
 */
if (isset($_POST['gridData'])) {
    // TODO add some security checks here
    file_put_contents($filename, json_encode($_POST['gridData']));

} else {
    /**
     * return saved grid data
     */
    header('Content-Type: application/json');
    echo file_get_contents($filename);
}
