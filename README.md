# VaxVision: Vaccine Attitude and Communication Simulation

## Recent Development Updates

The conversation focused on improving a React application's visualization features, particularly around vaccine hesitancy data. Key changes included:

1. Data Visualization Improvements:
   - Modified initial state to be empty before pressing play button
   - Updated color schemes multiple times:
     - First changed to professional colors (#2563EB, #059669, #7C3AED)
     - Then reverted to original colors (#6366F1, #10B981, #8B5CF6) with enhanced styling
   - Added improved styling elements:
     - Better grid lines (#E2E8F0)
     - Dark gray axis labels (#1F2937)
     - Enhanced tooltips with white background and shadows
     - Fixed axis domains

2. Policy Effectiveness Data:
   - Updated to reflect more realistic outcomes
   - Added more granular weekly data points (9 points)
   - Adjusted trends for different policies:
     - Mandate: Strongest effect (65% → 32%)
     - Financial: Moderate effect (65% → 43%)
     - Ambassador: Gradual effect (65% → 42%)
     - No Policy: Minimal change (65% → 61%)

3. Canadian News Sources:
   - Updated news sources to Canadian equivalents
   - Maintained political balance:
     - CBC News (center-left)
     - CTV News (centrist)
     - Global News (center-right)
     - Toronto Star (progressive)
     - National Post (conservative)
     - The Rebel (right-leaning)

4. Content Updates:
   - Simplified the methodology description
   - Removed references to human review and bias analysis
   - Updated verification process text to focus on AI classification

5. Development:
   - Started the development server with npm run dev
   - Request to lower the "Hesitancy Impact (%)" label in influencing factors

## Technology Stack

This dashboard uses Crewai for agentic AI orchestration and Llama 3.1 8B as the language model.

## Limitations & Biases

- Limited access to private social media conversations
- Potential language and regional biases in data collection
- Evolving nature of COVID-19 research and information
- Challenges in detecting subtle forms of misinformation

## Features

[Rest of README content would go here...] 