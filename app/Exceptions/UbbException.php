<?php

namespace App\Exceptions;

use Exception;
use Nuwave\Lighthouse\Exceptions\RendersErrorsExtensions;

class UbbException extends Exception implements RendersErrorsExtensions
{
    /**
     * @var @string
     */
    private $reason;

    public function __construct(string $message, $some, string $reason = null)
    {
        parent::__construct($message);

        $this->reason = $reason;
        $this->some = $some;

    }

    /**
     * Returns true when exception message is safe to be displayed to a client.
     *
     * @return bool
     * @api
     */
    public function isClientSafe(): bool
    {
        return true;
    }

    /**
     * Returns string describing a category of the error.
     *
     * Value "graphql" is reserved for errors produced by query parsing or validation, do not use it.
     *
     * @return string
     * @api
     */
    public function getCategory(): string
    {
        return 'ubb';
    }

    /**
     * Return the content that is put in the "extensions" part
     * of the returned error.
     *
     * @return array
     */
    public function extensionsContent(): array
    {
        return [
            'some' => $this->some,
            'reason' => $this->reason,
        ];
    }
}
