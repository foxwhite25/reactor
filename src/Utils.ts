import Decimal from 'break_infinity.js';

export const isDecimal = (o: unknown): o is Decimal =>
    o instanceof Decimal ||
  (typeof o === 'object' &&
    o !== null &&
    Object.keys(o).length === 2 &&
    'mantissa' in o &&
    'exponent' in o)
;

const supportsFormatToParts =
  typeof (Intl.NumberFormat.prototype as Intl.NumberFormat).formatToParts ===
  'function';

// In some browsers, this will return an empty-1 length array (?), causing a "TypeError: Cannot read property 'value' of undefined"
// if we destructure it... To reproduce: ` const [ { value } ] = []; `
// https://discord.com/channels/677271830838640680/730669616870981674/830218436201283584
const IntlFormatter = !supportsFormatToParts
    ? null
    : Intl.NumberFormat()
        .formatToParts(1000.1)
        .filter((part) => part.type === 'decimal' || part.type === 'group');

// gets the system number delimiter and decimal values, defaults to en-US
const [{ value: group }, { value: dec }] =
  IntlFormatter?.length !== 2
      ? [{ value: ',' }, { value: '.' }]
      : IntlFormatter;

// Number.toLocaleString opts for 2 decimal places
const locOpts = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

const padEvery = (str: string, places = 3) => {
    let step = 1,
        newStr = '';
    for (let i = str.length - 1; i >= 0; i--) {
        // pad every [places] places if we aren't at the beginning of the string
        if (step++ === places && i !== 0) {
            step = 1;
            newStr = group + str[i] + newStr;
        } else {
            newStr = str[i] + newStr;
        }
    }

    // see https://www.npmjs.com/package/flatstr
    (newStr as unknown as number) | 0;
    return newStr;
};

export const format = (
    input:
    | Decimal
    | number
    | { [Symbol.toPrimitive]: unknown }
    | null
    | undefined,
    accuracy = 0,
    long = false,
    fractional = false,
): string => {
    if (input == null) {
        return '0 [null]';
    }

    if (typeof input === 'object' && Symbol.toPrimitive in input) {
        input = Number(input);
    }

    if (
    // invalid parameter
        (!(input instanceof Decimal) && typeof input !== 'number') ||
      isNaN(input as number)
    ) {
        return isNaN(input as number) ? '0 [NaN]' : '0 [und.]';
    } else if (
    // this case handles numbers less than 1e-6 and greater than 0
        typeof input === 'number' &&
      input < (!fractional ? 1e-3 : 1e-15) && // arbitrary number, don't change 1e-3
      input > 0 // don't handle negative numbers, probably could be removed
    ) {
        return input.toExponential(accuracy);
    }

    let power!: number;
    let mantissa!: number;
    if (isDecimal(input)) {
        // Gets power and mantissa if input is of type decimal
        power = input.e;
        mantissa = input.mantissa;
    } else {
        {
            if (input === 0) {
                return '0';
            }
            {
                power = Math.floor(Math.log10(Math.abs(input)));
                mantissa = input / Math.pow(10, power);
            }
        }
    }

    // This prevents numbers from jittering between two different powers by rounding errors
    if (mantissa > 9.9999999) {
        mantissa = 1;
        ++power;
    }

    if (mantissa < 1 && mantissa > 0.9999999) {
        mantissa = 1;
    }

    // If the power is less than 15 it's effectively 0

    if (power < -15) {
        return '0';
    }

    // If the power is negative, then we will want to address that separately.
    if (power < 0 && !isDecimal(input) && fractional) {
        if (power <= -15) {
            return `${format(mantissa, accuracy, long)} / ${Math.pow(
                10,
                -power - 15,
            )}Qa`;
        }
        if (power <= -12) {
            return `${format(mantissa, accuracy, long)} / ${Math.pow(
                10,
                -power - 12,
            )}T`;
        }
        if (power <= -9) {
            return `${format(mantissa, accuracy, long)} / ${Math.pow(
                10,
                -power - 9,
            )}B`;
        }
        if (power <= -6) {
            return `${format(mantissa, accuracy, long)} / ${Math.pow(
                10,
                -power - 6,
            )}M`;
        }
        if (power <= -3) {
            return `${format(mantissa, accuracy, long)} / ${Math.pow(
                10,
                -power - 3,
            )}K`;
        }
        return `${format(mantissa, accuracy, long)} / ${Math.pow(10, -power)}`;
    } else if (power < 6 || (long && power < 13)) {
        // If the power is less than 6 or format long and less than 13 use standard formatting (123,456,789)
        // Gets the standard representation of the number, safe as power is guaranteed to be > -12 and < 13
        let standard = mantissa * Math.pow(10, power);
        let standardString;
        // Rounds up if the number experiences a rounding error
        if (standard - Math.floor(standard) > 0.9999999) {
            standard = Math.ceil(standard);
        }
        // If the power is less than 1 or format long and less than 3 apply toFixed(accuracy) to get decimal places
        if ((power < 2 || (long && power < 3)) && accuracy > 0) {
            standardString = standard.toFixed(
                power === 2 && accuracy > 2 ? 2 : accuracy,
            );
        } else {
            // If it doesn't fit those criteria drop the decimal places
            standard = Math.floor(standard);
            standardString = standard.toString();
        }

        // Split it on the decimal place
        const [front, back] = standardString.split('.');
        // Apply a number group 3 comma regex to the front
        const frontFormatted = padEvery(front);

        // if the back is undefined that means there are no decimals to display, return just the front
        return !back ? frontFormatted : `${frontFormatted}${dec}${back}`;
    } else if (power < 1e6) {
        // If the power is less than 1e6 then apply standard scientific notation
        // Makes mantissa be rounded down to 2 decimal places
        const mantissaLook = (Math.floor(mantissa * 100) / 100).toLocaleString(
            undefined,
            locOpts,
        );
        // Makes the power group 3 with commas
        const powerLook = padEvery(power.toString());
        // returns format (1.23e456,789)
        return `${mantissaLook}e${powerLook}`;
    } else if (power >= 1e6) {
        if (!Number.isFinite(power)) {
            return 'Infinity';
        }

        // if the power is greater than 1e6 apply notation scientific notation
        // Makes mantissa be rounded down to 2 decimal places
        const mantissaLook = (Math.floor(mantissa * 100) / 100).toLocaleString(
            undefined,
            locOpts,
        );

        // Drops the power down to 4 digits total but never greater than 1000 in increments that equate to notations, (1234000 -> 1.234) ( 12340000 -> 12.34) (123400000 -> 123.4) (1234000000 -> 1.234)
        const powerDigits = Math.ceil(Math.log10(power));
        let powerFront = ((powerDigits - 1) % 3) + 1;
        let powerLook = power / Math.pow(10, powerDigits - powerFront);
        if (powerLook === 1000) {
            powerLook = 1;
            powerFront = 1;
        }

        const powerLookF = powerLook.toLocaleString(undefined, {
            minimumFractionDigits: 4 - powerFront,
            maximumFractionDigits: 4 - powerFront,
        });
        const notation = [
            '',
            '',
            'M',
            'B',
            'T',
            'Qa',
            'Qi',
            'Sx',
            'Sp',
            'Oc',
            'No',
            'Dc',
            'UDc',
            'DDc',
            'TDc',
            'QaDc',
            'QiDc',
            'SxDc',
            'SpDc',
            'OcDc',
            'NoDc',
            'Vg',
            'UVg',
            'DVg',
            'TVg',
            'QaVg',
            'QiVg',
            'SxVg',
            'SpVg',
            'OcVg',
            'NoVg',
        ];
        const powerLodge = Math.floor(Math.log10(power) / 3);
        // Return relevant notations alongside the "look" power based on what the power actually is
        if (typeof notation[powerLodge] === 'string') {
            return `${mantissaLook}e${powerLookF}${notation[powerLodge]}`;
        }

        // If it doesn't fit a notation then default to mantissa e power
        return `e${power.toExponential(2)}`;
    } else {
        return '0 [und.]';
    }
};
