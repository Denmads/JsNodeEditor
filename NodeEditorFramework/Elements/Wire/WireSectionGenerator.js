import Point from "../Mathematical/Point.js";
import CornerWireSection from "./Sections/CornerWireSection.js";
import OrthogonalWireSection from "./Sections/OrthogonalWireSection.js";

export default function generateWireSections(start, end, cornerRadius, extras) {
    if (start.x + cornerRadius < end.x) {
        return generateForwardWire(start, end, cornerRadius, extras);
    }
    else {
        return generateBackwardWire(start, end, cornerRadius, extras);
    }
}

function generateForwardWire(start, end, cornerRadius, extras) {
    let middleX = (end.x - start.x) / 2;
    let middleY = (end.y - start.y) / 2;

    let dir = Math.sign(end.y - start.y);

    let sections = [];

    if (start.x == end.x) {
        sections.push(new OrthogonalWireSection(extras.type, new Point(start.x, start.y), new Point(end.x, end.y), extras.width));
    }
    else {
        let lastSectionEnd = start;

        if (middleX - start.x > cornerRadius) {
            lastSectionEnd = new Point(middleX - cornerRadius, start.y);
            sections.push(new OrthogonalWireSection(extras.type, new Point(start.x, start.y), lastSectionEnd, extras.width));
        }

        let curveEndY = undefined;
        if (dir < 0) {
            curveEndY = lastSectionEnd.y + Math.max(middleY - lastSectionEnd.y, -cornerRadius);
        }
        else {
            curveEndY = lastSectionEnd.y + Math.min(middleY - lastSectionEnd.y, cornerRadius);
        }

        let curveOneEnd = new Point(middleX, curveEndY);
        sections.push(new CornerWireSection(extras.type, lastSectionEnd, curveOneEnd, extras.width, new Point(curveOneEnd.x, lastSectionEnd.y)));
        lastSectionEnd = curveOneEnd;

        if (Math.abs(middleY) > cornerRadius) {
            sections.push(new OrthogonalWireSection(extras.type, lastSectionEnd, new Point(lastSectionEnd.x, lastSectionEnd.y + (middleY - lastSectionEnd.y) * 2), extras.width));
            lastSectionEnd = new Point(lastSectionEnd.x, lastSectionEnd.y + (middleY - lastSectionEnd.y) * 2);
        }

        curveOneEnd = new Point(Math.min(lastSectionEnd.x + cornerRadius, end.x), end.y);
        sections.push(new CornerWireSection(extras.type, lastSectionEnd, curveOneEnd, extras.width, new Point(lastSectionEnd.x, end.y)));
        lastSectionEnd = curveOneEnd;

        if (lastSectionEnd.x != end.x) {
            sections.push(new OrthogonalWireSection(extras.type, lastSectionEnd, new Point(end.x, end.y), extras.width));
        }
    }

    return sections;
}

function generateBackwardWire(start, end, cornerRadius, extras) {
    let sections = [];

    return sections;
}