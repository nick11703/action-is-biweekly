[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nick11703_action-is-biweekly&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=nick11703_action-is-biweekly)

# is-biweekly
GitHub action to determine if the currently running workflow a biweekly run

## Concept
This is intended to be used with a weekly cron task, but compare the current workflow run to a comparison date. This will determine if the current date is the same day of the week, and at a 2 week interval from that date.

## Notes
All dates and times are processed as UTC times

## Inputs

- `comparison-date`: **(required)** The time to compare the running build against (YYYY-MM-DD) or any JavaScript parsable time string or number

- `fail-on-error`: Fail the current workflow if this is not a bi-weekly run

## Outputs

- `is-biweekly`: Boolean `true|false` if the current run is a biweekly run compared to input comparison date

## Example usage
```yaml
name: My biweekly cron schedule

on:
  schedule:
  - cron: 0 16 * * 5

jobs:
  check-biweekly:
    runs-on: ubuntu-latest
    steps:
    - name: Check if this is a biweekly run
      id: is-biweekly
      uses: nick11703/action-is-biweekly@main
      with:
        comparison-date: '2024-06-28'
      
    - name: output biweekly results
      if: ${{ steps.is-biweekly.outputs.is-biweekly }}
      run:  |
        echo 'This is a biweekly run of this workflow'
```
