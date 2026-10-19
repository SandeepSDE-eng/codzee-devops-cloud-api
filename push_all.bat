@echo off
title Pushing All Branches to GitHub...
cd /d C:\SandeYadav\codzee-devops-cloud-api

echo ========================================================
echo  Step 1: Pushing main branch (force update with full docs)...
echo ========================================================
git push -u origin main --force

echo.
echo ========================================================
echo  Step 2: Pushing PR #1: feat/jwt-auth-validation...
echo ========================================================
git push -u origin feat/jwt-auth-validation

echo.
echo ========================================================
echo  Step 3: Pushing PR #2: fix/security-and-error-handling...
echo ========================================================
git push -u origin fix/security-and-error-handling

echo.
echo ========================================================
echo  Step 4: Pushing PR #3: ci-devops/docker-and-github-actions...
echo ========================================================
git push -u origin ci-devops/docker-and-github-actions

echo.
echo ========================================================
echo  SUCCESS! All 4 branches pushed to GitHub!
echo ========================================================
echo Now open GitHub and Codzee.io to connect and open PRs.
pause
